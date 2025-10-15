/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { Client } from './types/client.js';
import type { SearchSelector, YTResult } from './search.js';
import type { ChannelSelector } from './channel.js';
import { initialDataSchema, type ContinuationEndpoint, type InitialData } from './types/response.js';
import type { PlaylistSelector } from './playlist.js';
import type { SearchHelper } from './types.js';
import { clientResponseSchema } from './types/client.js';
import { setTimeout } from 'node:timers/promises';
import { fetchError } from '@goatjs/core/errors/fetch';
import { getEntries } from '@goatjs/core/object';

type SelectorKeys = SearchSelector | ChannelSelector | PlaylistSelector;

type SelectorList = 'contents' | 'playlistVideoListRenderer'; // | 'playlistVideoListRenderer';

interface VideoOpts<K extends SelectorList> {
  api_endpoint: string;
  selectorList: K;
  selectorItem: SelectorKeys;
  limit?: number;
  sleep: number;
  sortBy?: ChannelSort;
}

export type ChannelSort = keyof typeof sort_by_map;

interface NextData {
  token: string;
  click_params: {
    clickTrackingParams: string;
  };
}

const headers: HeadersInit = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'accept-language': 'en',
};

const sort_by_map = {
  newest: 0,
  popular: 1,
  oldest: 2,
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const getVideos = async function* <T extends keyof YTResult, K extends SelectorList>(
  url: string,
  { api_endpoint, selectorList, selectorItem, sleep, sortBy, limit = 25 }: VideoOpts<K>,
): AsyncGenerator<YTResult[T]> {
  let isFirst = true;
  let quit = false;
  let count = 0;
  let data: IteratorResult<SearchHelper[K]> | InitialData | undefined;
  let nextData: NextData | undefined;
  let apiKey: string | undefined;
  let client: Client | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    if (isFirst) {
      const html = await getInitialData(url);
      const res = await clientResponseSchema.parseAsync(JSON.parse(getJsonFromHtml(html, 'INNERTUBE_CONTEXT', 2, '"}},') + '"}}'));
      client = res.client;
      apiKey = getJsonFromHtml(html, 'innertubeApiKey', 3);
      headers['X-Youtube-Client-Name'] = '1';
      headers['X-Youtube-Client-Version'] = client.clientVersion;
      const response = await initialDataSchema.parseAsync(JSON.parse(getJsonFromHtml(html, 'var ytInitialData = ', 0, '};') + '}'));
      data = searchDict<K>(response, selectorList).next();
      nextData = getNextData(data, sortBy);
      isFirst = false;
      if (sortBy && sortBy !== 'newest') continue;
    } else {
      if (!apiKey || !client || !nextData) throw new Error('Internal error: Incorrect loop, please report it to the github repository issue!');
      data = await getAjaxData(api_endpoint, apiKey, nextData, client);
      nextData = getNextData(data);
    }
    for (const result of searchDict<SelectorKeys>(data, selectorItem)) {
      count++;
      yield result as YTResult[T];
      if (count === limit) {
        quit = true;
        break;
      }
    }
    if (!nextData || quit) break;
    await setTimeout(sleep);
  }
};

const getAjaxData = async (api_endpoint: string, apiKey: string, nextData: NextData, client: Client) => {
  const body = {
    context: { clickTracking: nextData.click_params, client },
    continuation: nextData.token,
  };
  const query = new URLSearchParams({ key: apiKey });
  const res = await fetch(api_endpoint + '?' + query.toString(), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'content-type': 'application/json',
    },
  });
  if (!res.ok) throw fetchError(res.statusText, { status: res.status });
  return initialDataSchema.parseAsync(await res.json());
};

const getInitialData = async (url: string) => {
  headers['cookie'] = 'CONSENT=YES+cb; domain=.youtube.com;';
  const query = new URLSearchParams({ ucbcb: '1' });
  const res = await fetch(url + '?' + query.toString(), { headers });
  if (!res.ok) throw fetchError(res.statusText, { status: res.status });
  return res.text();
};

const getJsonFromHtml = (html: string, key: string, numChars = 2, stop = '"') => {
  const begin = html.indexOf(key) + key.length + numChars;
  const end = html.indexOf(stop, begin);
  if (begin === -1 || end === -1) throw new Error('Invalid JSON parsing.');
  return html.slice(begin, end);
};

const getNextData = <T extends keyof SearchHelper>(data: IteratorResult<SearchHelper[T]> | InitialData, sortBy?: ChannelSort) => {
  let endpoint: ContinuationEndpoint | undefined;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (sortBy && sortBy !== 'newest') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    endpoint = searchDict(data, 'feedFilterChipBarRenderer' as T).next().value.contents[sort_by_map[sortBy]]['chipCloudChipRenderer'][
      'navigationEndpoint'
    ];
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    endpoint = searchDict(data, 'continuationEndpoint' as T).next().value;
  }

  if (!endpoint) return;

  return {
    token: endpoint.continuationCommand.token,
    click_params: { clickTrackingParams: endpoint.clickTrackingParams },
  };
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const searchDict = function* <T extends keyof SearchHelper>(
  partial: InitialData | IteratorResult<SearchHelper[T]>,
  searchKey: T,
): Generator<SearchHelper[T]> {
  const stack = [partial];
  while (stack.length > 0) {
    const currentItem = stack.shift();
    // eslint-disable-next-line unicorn/no-null, @typescript-eslint/no-unnecessary-condition
    if (typeof currentItem === 'object' && currentItem != null) {
      if (Array.isArray(currentItem)) {
        for (const value of currentItem) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          stack.push(value);
        }
      } else {
        for (const [key, value] of getEntries(currentItem)) {
          if (key === searchKey) {
            yield value;
          } else {
            stack.push(value);
          }
        }
      }
    }
  }
};
