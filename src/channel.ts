import { ChannelSort, getVideos } from './core.js';

const typePropertyMap = {
  videos: 'videoRenderer',
  streams: 'videoRenderer',
  shorts: 'reelItemRenderer',
};

type FromChannelID = {
  channelId: string;
  channelUrl?: undefined;
  channelUsername?: undefined;
};

type FromChannelUrl = {
  channelId?: undefined;
  channelUrl: string;
  channelUsername?: undefined;
};

type FromChannelUsername = {
  channelId?: undefined;
  channelUrl?: undefined;
  channelUsername: string;
};

type ChannelOpts = (FromChannelID | FromChannelUrl | FromChannelUsername) & {
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
  contentType = 'videos',
  limit = 5,
  sleep = 1000,
  sortBy = 'newest',
}: ChannelOpts) {
  let baseUrl;
  if (channelUrl) {
    baseUrl = channelUrl;
  } else if (channelId) {
    baseUrl = `https://www.youtube.com/channel/${channelId}`;
  } else if (channelUsername) {
    baseUrl = `https://www.youtube.com/@${channelUsername}`;
  } else throw new Error('You need to provide one between channelUrl, channelId or channelUsername option.');
  const url = `${baseUrl}/${contentType}?view=0&flow=grid`;
  const videos = getVideos(url, { api_endpoint, selector: typePropertyMap[contentType], limit, sleep, sortBy });
  for await (const video of videos) {
    yield video;
  }
};
