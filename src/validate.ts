import { channelSchema } from './schemas/channel.js';
import { videoSchema } from './schemas/video.js';
import { YTResult } from './search.js';

export const validate = <T extends keyof YTResult>(type: T, result: YTResult[T]) => {
  let validation;
  if (type === 'video') {
    validation = videoSchema.validate(result);
  } else if (type === 'channel') {
    validation = channelSchema.validate(result);
  }
  if (validation?.error) {
    // eslint-disable-next-line no-console
    console.log(validation.error.details);
    throw new Error('Validation error');
  } else if (validation?.warning) {
    // eslint-disable-next-line no-console
    console.log(validation.warning.details);
    throw new Error('Validation warning');
  }
};
