/* eslint-disable no-console */
import coraline from 'coraline';
import scrapetube from './scrapetube.js';

const test = async (q?: string) => {
  if (!q) {
    console.log('You have to insert a number to continue');
    return;
  }
  switch (q) {
    case '1': {
      const videos = scrapetube.search('Reuters', { limit: 15, type: 'channel' });
      for await (const video of videos) {
        coraline.log(video);
        break;
      }
      break;
    }
    case '2': {
      console.time('search');
      const videos = scrapetube.search('Trap', { limit: 25 });
      for await (const video of videos) {
        console.log(video.videoId);
      }
      console.timeEnd('search');
      break;
    }
    case '3': {
      const videos = scrapetube.search('Italy', { type: 'playlist', limit: 1 });
      for await (const video of videos) {
        console.log(video);
      }
      console.timeEnd('search');
      break;
    }
    case '4': {
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

const title = 'Press 1 to test channel search, press 2 to test video search, press 3 to test playlist search, press 4 to test get channel';

const run = async () => {
  const input = await coraline.input.create({ title });
  await test(input);
  void run();
};

void run();
