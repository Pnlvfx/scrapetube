import type { YTResult } from './index.js';
import { channelSchema } from './schemas/channel.js';
import { videoSchema } from './schemas/video.js';

export const validate = <T extends keyof YTResult>(type: T, result: YTResult[T]) => {
  if (type === 'video') {
    videoSchema.validate(result);
  } else if (type === 'channel') {
    channelSchema.validate(result);
  }
};
