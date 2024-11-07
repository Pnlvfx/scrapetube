/* eslint-disable sonarjs/no-redundant-optional */
import { type ChannelSort, getVideos } from './core.js';

const typePropertyMap = {
  videos: 'videoRenderer',
  streams: 'videoRenderer',
  shorts: 'reelItemRenderer',
} as const;

export type ChannelSelector = (typeof typePropertyMap)[keyof typeof typePropertyMap];

interface FromChannelID {
  channelId: string;
  channelUrl?: undefined;
  channelUsername?: undefined;
}

interface FromChannelUrl {
  channelId?: undefined;
  channelUrl: string;
  channelUsername?: undefined;
}

interface FromChannelUsername {
  channelId?: undefined;
  channelUrl?: undefined;
  channelUsername: string;
}

export type ChannelOptions = (FromChannelID | FromChannelUrl | FromChannelUsername) & {
  limit?: number;
  sleep?: number;
  sortBy?: ChannelSort;
  contentType?: keyof typeof typePropertyMap;
};

const api_endpoint = 'https://www.youtube.com/youtubei/v1/browse';

export const getChannel = async function* ({
  channelId,
  channelUrl,
  channelUsername,
  limit,
  sleep = 1000,
  sortBy = 'newest',
  contentType = 'videos',
}: ChannelOptions) {
  let baseUrl;
  if (channelUrl) {
    baseUrl = channelUrl;
  } else if (channelId) {
    baseUrl = `https://www.youtube.com/channel/${channelId}`;
  } else if (channelUsername) {
    baseUrl = `https://www.youtube.com/@${channelUsername}`;
  } else throw new Error('You need to provide one between channelUrl, channelId or channelUsername option.');
  const url = `${baseUrl}/${contentType}?view=0&flow=grid`;
  const videos = getVideos<'channel', 'contents'>(url, {
    api_endpoint,
    selectorList: 'contents',
    selectorItem: typePropertyMap[contentType],
    limit,
    sleep,
    sortBy,
  });
  for await (const video of videos) {
    yield video;
  }
};
