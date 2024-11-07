import type { Channel } from './interfaces/channel.js';
import type { Playlist } from './interfaces/playlist.js';
import type { ContinuationEndpoint, FeedFilterChipBarRenderer, InitialDataContents } from './interfaces/response.js';
import { Video } from './interfaces/video.js';

export interface SearchHelper {
  contents: InitialDataContents;
  videoRenderer: Video;
  channelRenderer: Channel;
  playlistRenderer: Playlist;
  reelItemRenderer: object /**@TODO add the reel object here */;
  playlistVideoRenderer: object;
  feedFilterChipBarRenderer: FeedFilterChipBarRenderer;
  continuationEndpoint: ContinuationEndpoint;
  playlistVideoListRenderer: object;
}
