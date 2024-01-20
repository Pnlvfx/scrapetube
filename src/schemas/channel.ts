import Joi from 'joi';
import {
  descriptionSnippetSchema,
  longBylineTextSchema,
  navigationEndpointSchema,
  ownerBadgesSchema,
  shortBylineTextSchema,
  subscribeButtonSchema,
  subscriberCountTextSchema,
  subscriptionButtonSchema,
  thumbnailSchema,
  videoCountTextSchema,
} from './shared.js';

export const channelTitleSchema = Joi.object({
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'ChannelTitle' });

export const ownerBadges = Joi.array().items(Joi.any()).required();

export const channelSchema = Joi.object({
  channelId: Joi.string().required(),
  title: channelTitleSchema.required(),
  navigationEndpoint: navigationEndpointSchema.required(),
  thumbnail: thumbnailSchema.required(),
  descriptionSnippet: descriptionSnippetSchema,
  shortBylineText: shortBylineTextSchema.required(),
  videoCountText: videoCountTextSchema.required(),
  subscriptionButton: subscriptionButtonSchema.required(),
  ownerBadges: ownerBadgesSchema,
  subscriberCountText: subscriberCountTextSchema,
  subscribeButton: subscribeButtonSchema.required(),
  trackingParams: Joi.string().required(),
  longBylineText: longBylineTextSchema.required(),
}).meta({ className: 'Channel' });
