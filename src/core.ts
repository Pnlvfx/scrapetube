import type { Client } from './interfaces/client.js';
import coraline from 'coraline';

interface VideoOpts {
  api_endpoint: string;
  selector: string;
  limit?: number;
  sleep: number;
  sortBy?: ChannelSort;
}

const headers: HeadersInit = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
  Cookie: 'CONSENT=YES+cb',
};

export type ChannelSort = keyof typeof sort_by_map;

const sort_by_map = {
  newest: 0,
  popular: 1,
  oldest: 2,
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const getVideos = async function* (url: string, { api_endpoint, limit, selector, sleep, sortBy }: VideoOpts) {
  let data;
  let nextData;
  let quit = false;
  let isFirst = true;
  let count = 0;
  let apiKey: string | undefined;
  let client: Client | undefined;
  while (true) {
    if (isFirst) {
      console.log('scrapetube: using client!');
      const html = await getInitialData(url);
      client = JSON.parse(getJsonFromHtml(html, 'INNERTUBE_CONTEXT', 2, '"}},') + '"}}') as Client;
      apiKey = getJsonFromHtml(html, 'innertubeApiKey', 3);
      headers['X-Youtube-Client-Name'] = '1';
      headers['X-Youtube-Client-Version'] = client.client.clientVersion;
      data = JSON.parse(getJsonFromHtml(html, 'var ytInitialData = ', 0, '};') + '}');
      nextData = getNextData(data, sortBy);
      isFirst = false;
      if (sortBy && sortBy !== 'newest') continue;
    } else {
      console.log('scrapetube: using server!');
      if (!apiKey || !nextData) throw new Error('Internal error: Incorrect loop, please report it to the github repository issue!');
      console.log({ nextData });
      data = await getAjaxData(api_endpoint, apiKey, nextData, client);
      nextData = getNextData(data);
    }
    for (const result of searchDict(data, selector)) {
      count += 1;
      yield result;
      if (count === limit) {
        quit = true;
        break;
      }
    }
    if (!nextData || quit) break;
    await coraline.wait(sleep);
  }
};

const getAjaxData = async (api_endpoint: string, apiKey: string, nextData: Record<string, unknown>, client: unknown) => {
  const body = {
    context: { clickTracking: nextData['click_params'], client },
    continuation: nextData['token'],
  };
  coraline.log({ body });
  const query = new URLSearchParams({ key: apiKey });
  const res = await fetch(api_endpoint + '?' + query.toString(), {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return res.json();
};

const getInitialData = async (url: string) => {
  const res = await fetch(url, {
    method: 'GET',
    headers,
  });
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return res.text();
};

const getJsonFromHtml = (html: string, key: string, numChars = 2, stop = '"') => {
  const begin = html.indexOf(key) + key.length + numChars;
  const end = html.indexOf(stop, begin);
  return html.slice(begin, end);
};

const getNextData = (data: unknown, sortBy?: ChannelSort) => {
  let endpoint;
  // eslint-disable-next-line unicorn/prefer-ternary
  if (sortBy && sortBy !== 'newest') {
    console.log({ value: searchDict(data, 'feedFilterChipBarRenderer').next() });
    endpoint = searchDict(data, 'feedFilterChipBarRenderer').next().value['contents'][sort_by_map[sortBy]]['chipCloudChipRenderer'][
      'navigationEndpoint'
    ];
  } else {
    endpoint = searchDict(data, 'continuationEndpoint').next();
  }
  if (!endpoint) throw new Error('Missing endpoint');
  return {
    token: endpoint.value['continuationCommand']['token'],
    click_params: { clickTrackingParams: endpoint.value['clickTrackingParams'] },
  };
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const searchDict = function* (partial: unknown, searchKey: string) {
  const stack = [partial];

  while (stack.length > 0) {
    const currentItem = stack.shift();
    if (typeof currentItem === 'object' && currentItem !== null) {
      if (Array.isArray(currentItem)) {
        for (const value of currentItem) {
          stack.push(value);
        }
      } else {
        for (const [key, value] of Object.entries(currentItem)) {
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
