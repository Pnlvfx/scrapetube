/* eslint-disable no-console */
import coraline from 'coraline';
import scrapetube from './index.js';

const test = async (q?: string) => {
  if (!q) {
    console.log('You have to insert a number to continue');
    return;
  }
  switch (q) {
    case '1': {
      const videos = scrapetube.search('Reuters', 'channel', { limit: 5 });
      for await (const video of videos) {
        coraline.log(video);
        break;
      }
      break;
    }
    case '2': {
      const videos = scrapetube.search('Lei', 'video', { limit: 100 });
      for await (const video of videos) {
        console.log(video.videoId);
      }

      break;
    }
    case '3': {
      const latestVideos = scrapetube.getChannel({ channelUsername: 'Reuters' });
      for await (const video of latestVideos) {
        coraline.log(video);
        break;
      }
      break;
    }
    // No default
  }
};

const title = 'Press 1 to test channel search, press 2 to test video search or press 3 to get a channel';

coraline.createScriptExec(test, { repeat: true, title });
