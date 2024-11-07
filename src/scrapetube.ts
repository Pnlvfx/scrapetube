import { search } from './search.js';
import { getChannel } from './channel.js';
import { searchWithGoogle } from './google/search-with-google.js';
import { getPlaylist } from './playlist.js';

/** CHECK THE README TO SEE HOW TO USE THE SEARCH */

const scrapetube = {
  search,
  getChannel,
  getPlaylist,
  searchWithGoogle,
};

export default scrapetube;

export type * from './interfaces/channel.js';
export type * from './interfaces/video.js';
export type * from './interfaces/playlist.js';
