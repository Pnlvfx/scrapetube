import type { Channel, Video } from './interfaces/index.js';
import { validate } from './validate.js';
import { getVideos } from './core.js';

const api_endpoint = 'https://www.youtube.com/youtubei/v1/search';

const sort_by_map = {
  relevance: 'A',
  upload_date: 'I',
  view_count: 'M',
  rating: 'E',
};

const results_type_map = {
  video: ['B', 'videoRenderer'],
  channel: ['C', 'channelRenderer'],
  playlist: ['D', 'playlistRenderer'],
  movie: ['E', 'videoRenderer'],
};

export interface SearchOpts {
  limit?: number;
  sleep?: number;
  sortBy?: keyof typeof sort_by_map;
}

export interface YTResult {
  video: Video;
  channel: Channel;
  playlist: unknown;
  movie: unknown;
}

export const search = async function* <T extends keyof YTResult>(
  query: string,
  type: T,
  { limit = 10, sleep = 1000, sortBy = 'relevance' }: SearchOpts = {},
): AsyncGenerator<YTResult[T]> {
  const [saha, selector] = results_type_map[type];
  if (!saha || !selector) throw new Error('Invalid parameters provided');
  const param_string = `CA${sort_by_map[sortBy]}SAhA${saha}`;
  const url = `https://www.youtube.com/results?search_query=${query}&sp=${param_string}`;
  const videos = getVideos(url, { selector, limit, sleep, api_endpoint });
  for await (const video of videos) {
    if (process.env['NODE_ENV'] !== 'production') {
      await validate(type, video);
    }
    yield video;
  }
};
