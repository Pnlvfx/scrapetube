import Joi from 'joi';
import { badgesSchema, longBylineTextSchema, navigationEndpointSchema, runsSchema, shortBylineTextSchema, thumbnailSchema } from './shared.js';

export const accessibilityDataSchema = Joi.object({
  label: Joi.string(),
}).meta({ className: 'AccessibilityData' });

export const accessibilitySchema = Joi.object({
  accessibilityData: accessibilityDataSchema.required(),
}).meta({ className: 'Accessibility' });

export const titleSchema = Joi.object({
  runs: runsSchema,
  accessibility: accessibilitySchema.required(),
}).meta({ className: 'Title' });

export const publishedTimeTextSchema = Joi.object({
  simpleText: Joi.string().required(),
}).meta({ className: 'PublishedTimeText' });

export const lengthTextSchema = Joi.object({
  accessibility: accessibilitySchema.required(),
  simpleText: Joi.string().required(),
}).meta({ className: 'LengthText' });

export const viewCountTextSchema = Joi.object({
  simpleText: Joi.string().required(),
}).meta({ className: 'ViewCountText' });

export const ownerTextSchema = Joi.object({
  runs: runsSchema,
}).meta({ className: 'OwnerText' });

export const accessibilityDataWithObjectSchema = Joi.object({
  accessibility: accessibilitySchema,
  simpleText: Joi.string(),
  runs: runsSchema,
}).meta({ className: 'AccessibilityDataWithObject' });

export const menuRendererSchema = Joi.object({
  menuRenderer: Joi.object({
    items: Joi.array().items(Joi.any()),
    trackingParams: Joi.string().required(),
    accessibility: Joi.any(),
  }).required(),
}).meta({ className: 'MenuRenderer' });

export const channelThumbnailWithLinkRendererSchema = Joi.object({
  channelThumbnailWithLinkRenderer: Joi.object({
    thumbnail: thumbnailSchema.required(),
    navigationEndpoint: navigationEndpointSchema.required(),
    accessibility: Joi.any(),
  }).required(),
}).meta({ className: 'ChannelThumbnailWithLinkRenderer' });

export const inlinePlaybackEndpointSchema = Joi.object({
  clickTrackingParams: Joi.string().required(),
  commandMetadata: Joi.object({
    webCommandMetadata: Joi.any().required(),
  }).required(),
  watchEndpoint: navigationEndpointSchema.required(),
}).meta({ className: 'InlinePlaybackEndpoint' });

export const snippetSchema = Joi.object({
  snippetText: accessibilityDataWithObjectSchema.required(),
  snippetHoverText: accessibilityDataWithObjectSchema.required(),
  maxOneLine: Joi.boolean(),
}).meta({ className: 'Snippet' });

export const detailedMetadataSnippetsSchema = Joi.array().items(snippetSchema.required()).meta({ className: 'DetailedMetadataSnippets' });

export const videoSchema = Joi.object({
  videoId: Joi.string().required(),
  thumbnail: thumbnailSchema.required(),
  title: titleSchema.required(),
  longBylineText: longBylineTextSchema.required(),
  publishedTimeText: publishedTimeTextSchema,
  lengthText: lengthTextSchema.required(),
  viewCountText: viewCountTextSchema.required(),
  navigationEndpoint: navigationEndpointSchema.required(),
  badges: badgesSchema,
  ownerBadges: badgesSchema,
  ownerText: ownerTextSchema.required(),
  shortBylineText: shortBylineTextSchema.required(),
  trackingParams: Joi.string().required(),
  showActionMenu: Joi.boolean().required(),
  shortViewCountText: accessibilityDataWithObjectSchema.required(),
  menu: menuRendererSchema.required(),
  channelThumbnailSupportedRenderers: channelThumbnailWithLinkRendererSchema.required(),
  thumbnailOverlays: Joi.array().items(Joi.any()).required(),
  richThumbnail: Joi.object({
    movingThumbnailRenderer: Joi.any().required(),
  }),
  detailedMetadataSnippets: detailedMetadataSnippetsSchema,
  expandableMetadata: Joi.object(),
  inlinePlaybackEndpoint: inlinePlaybackEndpointSchema,
  searchVideoResultEntityKey: Joi.string().required(),
}).meta({ className: 'Video' });
