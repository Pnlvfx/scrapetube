import { search } from './search.js';
import { getChannel } from './channel.js';
import { searchWithGoogle } from './google/search-with-google.js';
import { getPlaylist } from './playlist.js';

/** CHECK THE README TO SEE HOW TO USE THE SEARCH */

export const scrapetube = {
  search,
  getChannel,
  getPlaylist,
  searchWithGoogle,
};
