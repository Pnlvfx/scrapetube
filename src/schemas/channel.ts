import Joi from 'joi';
import {
  descriptionSnippetSchema,
  longBylineTextSchema,
  navigationEndpointSchema,
  shortBylineTextSchema,
  subscribeButtonSchema,
  subscriberCountTextSchema,
  subscriptionButtonSchema,
  thumbnailSchema,
  titleSchema,
  videoCountTextSchema,
} from './shared.js';

export const channelSchema = Joi.object({
  channelId: Joi.string().required(),
  title: titleSchema.required(),
  navigationEndpoint: navigationEndpointSchema.required(),
  thumbnail: thumbnailSchema.required(),
  descriptionSnippet: descriptionSnippetSchema.required(),
  shortBylineText: shortBylineTextSchema.required(),
  videoCountText: videoCountTextSchema.required(),
  subscriptionButton: subscriptionButtonSchema.required(),
  subscriberCountText: subscriberCountTextSchema.required(),
  subscribeButton: subscribeButtonSchema.required(),
  trackingParams: Joi.string().required(),
  longBylineText: longBylineTextSchema.required(),
}).meta({ className: 'Channel' });
