import { describe, it } from '@jest/globals';
import scrapetube from '../src/scrapetube.js';
import coraline from 'coraline';

describe('The coraline download from url', () => {
  it('Should search a query on youtube.', async () => {
    const output = scrapetube.search('Cars', 'video');
    for await (const video of output) {
      coraline.log(video);
    }
  });
});
