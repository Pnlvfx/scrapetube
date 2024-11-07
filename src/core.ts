import type { Client, ClientResponse } from './interfaces/client.js';
import type { SearchSelector, YTResult } from './search.js';
import type { ChannelSelector } from './channel.js';
import type { InitialData } from './interfaces/response.js';
import coraline, { getEntries, temporaryFile } from 'coraline';
import { clientResponseSchema } from './schemas/client.js';
import { initialDataSchema } from './schemas/response.js';
import fs from 'fs/promises';

type SelectorKeys = SearchSelector | ChannelSelector | 'playlistVideoRenderer';

export type SelectorList = 'contents' | 'playlistVideoListRenderer';

interface VideoOpts<K extends SelectorList> {
  api_endpoint: string;
  selectorList: K;
  selectorItem: SelectorKeys;
  limit?: number;
  sleep: number;
  sortBy?: ChannelSort;
}

const headers: HeadersInit = {
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  'accept-language': 'en',
};

export type ChannelSort = keyof typeof sort_by_map;

type NextData = ReturnType<typeof getNextData>;

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
  let data: InitialData[K] | undefined;
  let nextData: NextData | undefined;
  let apiKey: string | undefined;
  let client: Client | undefined;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    if (isFirst) {
      const html = await getInitialData(url);
      const res = JSON.parse(getJsonFromHtml(html, 'INNERTUBE_CONTEXT', 2, '"}},') + '"}}') as ClientResponse;
      await clientResponseSchema.validateAsync(res);
      client = res.client;
      apiKey = getJsonFromHtml(html, 'innertubeApiKey', 3);
      headers['X-Youtube-Client-Name'] = '1';
      headers['X-Youtube-Client-Version'] = client.clientVersion;
      const response = JSON.parse(getJsonFromHtml(html, 'var ytInitialData = ', 0, '};') + '}') as InitialData;
      await initialDataSchema.validateAsync(response);
      data = searchDict(response, selectorList).next();
      nextData = getNextData(data, sortBy);
      isFirst = false;
      if (sortBy && sortBy !== 'newest') continue;
    } else {
      if (!apiKey || !nextData || !client) throw new Error('Internal error: Incorrect loop, please report it to the github repository issue!');
      data = await getAjaxData(api_endpoint, apiKey, nextData, client);
      nextData = getNextData(data);
    }
    for (const result of searchDict(data, selectorItem)) {
      count++;
      yield result;
      if (count === limit) {
        quit = true;
        break;
      }
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!nextData || quit) break;
    await coraline.wait(sleep);
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
  if (!res.ok) throw new Error(`${res.status.toString()}: ${res.statusText}`);
  const data = (await res.json()) as InitialData;
  await initialDataSchema.validateAsync(data);
  console.log('New api request');
  return data;
};

const getInitialData = async (url: string) => {
  headers['Cookie'] = 'CONSENT=YES+cb;';
  const query = new URLSearchParams({ ucbcb: '1' });
  const res = await fetch(url + '?' + query.toString(), { headers });
  if (!res.ok) throw new Error(`${res.status.toString()}: ${res.statusText}`);
  return res.text();
};

const getJsonFromHtml = (html: string, key: string, numChars = 2, stop = '"') => {
  const begin = html.indexOf(key) + key.length + numChars;
  const end = html.indexOf(stop, begin);
  return html.slice(begin, end);
};

const getNextData = (data, sortBy?: ChannelSort) => {
  let endpoint;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (sortBy && sortBy !== 'newest') {
    endpoint = searchDict(data, 'feedFilterChipBarRenderer').next().value['contents'][sort_by_map[sortBy]]['chipCloudChipRenderer'][
      'navigationEndpoint'
    ];
  } else {
    endpoint = searchDict(data, 'continuationEndpoint').next();
  }
  const tokenData = endpoint.value['continuationCommand'];
  if (!tokenData) throw new Error('Missing next data token');
  return {
    token: tokenData['token'],
    click_params: { clickTrackingParams: endpoint.value['clickTrackingParams'] },
  };
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const searchDict = function* (partial: unknown, searchKey: string) {
  const stack = [partial];
  while (stack.length > 0) {
    const currentItem = stack.shift();
    // eslint-disable-next-line unicorn/no-null
    if (typeof currentItem === 'object' && currentItem != null) {
      if (Array.isArray(currentItem)) {
        for (const value of currentItem) {
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
