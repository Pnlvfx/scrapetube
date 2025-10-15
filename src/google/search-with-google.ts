/* eslint-disable no-restricted-properties */
import type { Params$Resource$Search$List } from './types/search-options.js';
import type { Schema$SearchListResponse } from './types/search-response.js';
import { getEntries } from '@goatjs/core/object';

const searchList = async (params?: Params$Resource$Search$List) => {
  let separator = '?';
  let url = 'https://youtube.googleapis.com/youtube/v3/search';
  if (params) {
    for (const [key, value] of getEntries(params)) {
      if (!value) continue;
      url += `${separator}${key}=${encodeURIComponent(value.toString())}`;
      separator = '&';
    }
  }
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = (await res.json()) as Schema$SearchListResponse;
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
};

export const searchWithGoogle = async (q: string): Promise<string> => {
  if (!process.env['YOUTUBE_API_KEY']) {
    throw new Error(
      'You need to get a google key and enable youtube to use this function, you can use the search function which does not require authentication.',
    );
  }
  const list = await searchList({
    key: process.env['YOUTUBE_API_KEY'],
    part: ['snippet, id'],
    q,
    maxResults: 5,
  });
  const videoId = list.items?.at(0)?.id?.videoId;
  if (!videoId) throw new Error('Cannot find any track with this query!');
  return videoId;
};
