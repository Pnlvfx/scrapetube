import type { Video } from './interfaces/video.js';
import type { Channel } from './interfaces/channel.js';
import type { Playlist } from './interfaces/playlist.js';
import { getVideos } from './core.js';

export type SearchSelector = (typeof results_type_map)[keyof typeof results_type_map][1];

export interface SearchOptions<T extends keyof YTResult | undefined> {
  limit?: number;
  sleep?: number;
  sortBy?: keyof typeof sort_by_map;
  type?: T;
}

export interface YTResult {
  video: Video;
  channel: Channel;
  playlist: Playlist;
  movie: Video;
}

const api_endpoint = 'https://www.youtube.com/youtubei/v1/search';

const sort_by_map = {
  relevance: 'A',
  upload_date: 'I',
  view_count: 'M',
  rating: 'E',
} as const;

const results_type_map = {
  video: ['B', 'videoRenderer'],
  channel: ['C', 'channelRenderer'],
  playlist: ['D', 'playlistRenderer'],
  movie: ['E', 'videoRenderer'],
} as const;

/** Function overload for when options.type is not provided, used for providing typed response. */
export function search<T extends undefined>(query: string, options?: SearchOptions<T>): AsyncGenerator<Awaited<YTResult['video']>, void, unknown>;

/** Function overload for when options.type is provided, used for providing typed response. */
export function search<T extends keyof YTResult>(query: string, options: SearchOptions<T>): AsyncGenerator<Awaited<YTResult[T]>, void, unknown>;

export function search(query: string): AsyncGenerator<Awaited<YTResult['video']>, void, unknown>;

export async function* search<T extends keyof YTResult>(query: string, { limit, sleep = 1000, sortBy = 'relevance', type }: SearchOptions<T> = {}) {
  const typescriptShitType = type ?? 'video';
  const [saha, selector] = results_type_map[typescriptShitType];
  const param_string = `CA${sort_by_map[sortBy]}SAhA${saha}`;
  const url = `https://www.youtube.com/results?search_query=${query}&sp=${param_string}`;
  const videos = getVideos<T, 'contents'>(url, { selectorList: 'contents', selectorItem: selector, limit, sleep, api_endpoint });
  for await (const video of videos) {
    yield video;
  }
}
