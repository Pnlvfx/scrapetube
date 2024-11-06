import type { YTResult } from './search.js';
import { channelSchema } from './schemas/channel.js';
import { videoSchema } from './schemas/video.js';

export const validate = async <T extends keyof YTResult>(type: T, result: YTResult[T]) => {
  if (type === 'video') {
    await videoSchema.validateAsync(result);
  } else if (type === 'channel') {
    await channelSchema.validateAsync(result);
  }
};
