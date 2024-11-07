import Joi from 'joi';
import { badgesSchema, longBylineTextSchema, navigationEndpointSchema, runSchema, shortBylineTextSchema, thumbnailSchema } from './shared.js';

export const channelTitleSchema = Joi.object({
  simpleText: Joi.string().required(),
}).meta({ className: 'ChannelTitle' });

export const videoCountTextSchema = Joi.object({
  accessibility: Joi.object({
    accessibilityData: Joi.object({
      label: Joi.string().required(),
    }).required(),
  }),
  simpleText: Joi.string(),
  runs: Joi.array().items(runSchema),
}).meta({ className: 'VideoCountText' });

export const subscriptionButtonSchema = Joi.object({
  subscribed: Joi.boolean().required(),
}).meta({ className: 'SubscriptionButton' });

export const subscribeButtonSchema = Joi.object({
  buttonRenderer: Joi.object({
    style: Joi.string().valid('STYLE_DESTRUCTIVE').required(),
    size: Joi.string().valid('SIZE_DEFAULT').required(),
    isDisabled: Joi.boolean().required(),
    text: Joi.object({
      runs: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().required(),
          }),
        )
        .required(),
    }).required(),
    navigationEndpoint: navigationEndpointSchema.required(),
    trackingParams: Joi.string().required(),
  }).required(),
}).meta({ className: 'SubscribeButton' });

const descriptionSnippet = {
  runs: Joi.array().items(runSchema).required(),
};

export const subscriberCountText = {
  simpleText: Joi.string().required(),
};

export const channelSchema = Joi.object({
  channelId: Joi.string().required(),
  title: channelTitleSchema.required(),
  navigationEndpoint: navigationEndpointSchema.required(),
  thumbnail: thumbnailSchema.required(),
  descriptionSnippet: Joi.object(descriptionSnippet),
  shortBylineText: shortBylineTextSchema.required(),
  videoCountText: videoCountTextSchema.required(),
  subscriptionButton: subscriptionButtonSchema.required(),
  ownerBadges: badgesSchema,
  subscriberCountText: Joi.object(subscriberCountText),
  subscribeButton: subscribeButtonSchema.required(),
  trackingParams: Joi.string().required(),
  longBylineText: longBylineTextSchema.required(),
}).meta({ className: 'Channel' });
