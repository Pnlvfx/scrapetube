import { getVideos } from './core.js';

export interface PlaylistOptions {
  limit: number;
  sleep: number;
}

const api_endpoint = 'https://www.youtube.com/youtubei/v1/browse';

export const getPlaylist = async function* (playlistId: string, { limit, sleep = 1000 }: PlaylistOptions) {
  const url = `https://www.youtube.com/playlist?list=${playlistId}`;
  const videos = getVideos(url, { api_endpoint, selectorList: 'playlistVideoListRenderer', selectorItem: 'playlistVideoRenderer', limit, sleep });
  for await (const video of videos) {
    yield video;
  }
};
