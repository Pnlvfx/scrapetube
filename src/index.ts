import { search } from './search.js';
import { getChannel } from './channel.js';

const scrapetube = {
  search,
  getChannel,
};

export default scrapetube;

// const videos = scrapetube.search('Reuters', 'channel', { limit: 5 });
// for await (const video of videos) {
//   console.log(video);
// }

// const videos = scrapetube.search('Lei', 'video', { limit: 100 });
// for await (const video of videos) {
//   console.log(video.videoId);
// }

// const videos = scrapetube.getChannel({ channelUsername: 'Reuters', limit: 5 });
// for await (const video of videos) {
//   console.log(video);
//   break;
// }

// const latestVideos = scrapetube.getChannel({ channelUsername: 'Reuters' });
// for await (const video of latestVideos) {
//   console.log(video);
//   break;
// }
