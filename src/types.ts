import type { Channel } from './schemas/channel.js';
import type { Playlist } from './schemas/playlist.js';
import type { ContinuationEndpoint, FeedFilterChipBarRenderer, InitialDataContents } from './schemas/response.js';
import type { Video } from './schemas/video.js';

export interface SearchHelper {
  contents: InitialDataContents;
  videoRenderer: Video;
  channelRenderer: Channel;
  playlistRenderer: Playlist;
  reelItemRenderer: object /** TODO [2025-12-12] add the reel object here */;
  playlistVideoRenderer: object;
  feedFilterChipBarRenderer: FeedFilterChipBarRenderer;
  continuationEndpoint: ContinuationEndpoint;
  playlistVideoListRenderer: object;
}
