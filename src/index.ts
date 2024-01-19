import coraline from 'coraline';
import { results_type_map, sort_by_map } from './config.js';

const api_endpoint = 'https://www.youtube.com/youtubei/v1/search';

const headers: HeadersInit = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
  Cookie: 'CONSENT=YES+cb',
};

const scrapetube = {
  search: async function* (
    query: string,
    limit = 5,
    sleep = 1,
    sortBy: keyof typeof sort_by_map = 'relevance',
    resultsType: keyof typeof results_type_map = 'video',
  ) {
    const [saha, selector] = results_type_map[resultsType];
    if (!saha || !selector) throw new Error('Invalid parameters provided');
    const param_string = `CA${sort_by_map[sortBy]}SAhA${saha}`;
    const url = `https://www.youtube.com/results?search_query=${query}&sp=${param_string}`;
    const videos = getVideos(url, selector, limit, sleep);
    for await (const video of videos) {
      yield video;
    }
  },
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const getVideos = async function* (url: string, selector: string, limit: number, sleep: number) {
  let data;
  let nextData;
  let quit = false;
  let isFirst = true;
  let count = 0;
  let apiKey;
  let client;
  while (true) {
    if (isFirst) {
      console.log('scrapetube: using client!');
      const html = await getInitialData(url);
      client = JSON.parse(getJsonFromHtml(html, 'INNERTUBE_CONTEXT', 2, '"}},') + '"}}');
      apiKey = getJsonFromHtml(html, 'innertubeApiKey', 3);
      headers['X-Youtube-Client-Name'] = '1';
      headers['X-Youtube-Client-Version'] = client['clientVersion'];
      data = JSON.parse(getJsonFromHtml(html, 'var ytInitialData = ', 0, '};') + '}');
      nextData = getNextData(data);
      isFirst = false;
    } else {
      console.log('scrapetube: using server!');
      if (!apiKey || !nextData) throw new Error('Internal error: Incorrect loop, please report it to the github repository issue!');
      data = await getAjaxData(apiKey, nextData, client);
    }
    for (const result of searchDict(data, selector)) {
      count += 1;
      yield result;
      if (count === limit) {
        quit = true;
        break;
      }
    }
    if (quit) break;
    await coraline.wait(sleep);
  }
};

const getAjaxData = async (apiKey: string, nextData: Record<string, unknown>, client: unknown) => {
  const body = JSON.stringify({
    context: { clickTracking: nextData['click_params'], client },
    continuation: nextData['token'],
  });
  const query = new URLSearchParams({ key: apiKey });
  const res = await fetch(api_endpoint + '?' + query.toString(), {
    method: 'POST',
    body,
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

const getNextData = (data: unknown) => {
  const rawNextData = searchDict(data, 'continuationEndpoint').next();
  return {
    token: rawNextData.value['continuationCommand']['token'],
    clickParams: { clickTrackingParams: rawNextData.value['clickTrackingParams'] },
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

export default scrapetube;

// // const videos = scrapetube.search('Reuters', 2, 0, 'upload_date', 'channel');
// // for await (const video of videos) {
// //   console.log(video);
// // }
