/* eslint-disable no-console */
import { describe, it } from '@jest/globals';
import { scrapetube } from '../src/scrapetube.js';

describe('The coraline download from url', () => {
  it('Should search a query on youtube.', async () => {
    const output = scrapetube.search('Cars');
    for await (const video of output) {
      console.log(video);
    }
  });
});
