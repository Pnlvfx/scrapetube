import { describe, it } from '@jest/globals';
import scrapetube from '../src/scrapetube.js';

describe('The coraline download from url', () => {
  it('Should search a query on youtube.', async () => {
    const output = await scrapetube.search('Cars', 'video');
    coraline.log(output);
  });
});
