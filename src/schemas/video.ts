import Joi from 'joi';
import {
  badgesSchema,
  longBylineTextSchema,
  navigationEndpointSchema,
  ownerBadgesSchema,
  runsSchema,
  shortBylineTextSchema,
  thumbnailSchema,
} from './shared.js';

export const accessibilityDataSchema = Joi.object({
  label: Joi.string(),
})
  .required()
  .meta({ className: 'AccessibilityData' });

export const accessibilitySchema = Joi.object({
  accessibilityData: accessibilityDataSchema.required(),
}).meta({ className: 'Accessibility' });

const titleSchema = Joi.object({
  runs: runsSchema,
  accessibility: accessibilitySchema.required(),
}).required();

export const publishedTimeTextSchema = Joi.object({
  simpleText: Joi.string().required(),
}).meta({ className: 'PublishedTimeText' });

export const lengthTextSchema = Joi.object({
  accessibility: accessibilitySchema.required(),
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'LengthText' });

export const viewCountTextSchema = Joi.object({
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'ViewCountText' });

export const ownerTextSchema = Joi.object({
  runs: runsSchema,
})
  .required()
  .meta({ className: 'OwnerText' });

export const accessibilityDataWithObjectSchema = Joi.object({
  accessibility: accessibilitySchema,
  simpleText: Joi.string(),
  runs: runsSchema,
})
  .required()
  .meta({ className: 'AccessibilityDataWithObject' });

export const menuRendererSchema = Joi.object({
  menuRenderer: Joi.object({
    items: Joi.array().items(Joi.any()),
    trackingParams: Joi.string().required(),
    accessibility: Joi.any(),
  }).required(),
})
  .required()
  .meta({ className: 'MenuRenderer' });

export const channelThumbnailWithLinkRendererSchema = Joi.object({
  channelThumbnailWithLinkRenderer: Joi.object({
    thumbnail: thumbnailSchema.required(),
    navigationEndpoint: navigationEndpointSchema.required(),
    accessibility: Joi.any(),
  }).required(),
})
  .required()
  .meta({ className: 'ChannelThumbnailWithLinkRenderer' });

export const thumbnailOverlayTimeStatusRendererSchema = Joi.object({
  thumbnailOverlayTimeStatusRenderer: Joi.object({
    // Add properties as needed
  }).required(),
})
  .required()
  .meta({ className: 'ThumbnailOverlayTimeStatusRenderer' });

export const thumbnailOverlayToggleButtonRendererSchema = Joi.object({
  thumbnailOverlayToggleButtonRenderer: Joi.object({
    // Add properties as needed
  }).required(),
})
  .required()
  .meta({ className: 'ThumbnailOverlayToggleButtonRenderer' });

export const thumbnailOverlayNowPlayingRendererSchema = Joi.object({
  thumbnailOverlayNowPlayingRenderer: Joi.object({
    // Add properties as needed
  }).required(),
})
  .required()
  .meta({ className: 'ThumbnailOverlayNowPlayingRenderer' });

export const thumbnailOverlayLoadingPreviewRendererSchema = Joi.object({
  thumbnailOverlayLoadingPreviewRenderer: Joi.object({
    // Add properties as needed
  }).required(),
})
  .required()
  .meta({ className: 'ThumbnailOverlayLoadingPreviewRenderer' });

export const inlinePlaybackEndpointSchema = Joi.object({
  clickTrackingParams: Joi.string().required(),
  commandMetadata: Joi.object({
    webCommandMetadata: Joi.any().required(),
  }).required(),
  watchEndpoint: navigationEndpointSchema.required(),
})
  .required()
  .meta({ className: 'InlinePlaybackEndpoint' });

export const snippetSchema = Joi.object({
  snippetText: accessibilityDataWithObjectSchema,
  snippetHoverText: accessibilityDataWithObjectSchema,
  maxOneLine: Joi.boolean(),
})
  .required()
  .meta({ className: 'Snippet' });

export const detailedMetadataSnippetsSchema = Joi.array().items(snippetSchema).meta({ className: 'DetailedMetadataSnippets' });

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
  ownerBadges: ownerBadgesSchema,
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
  inlinePlaybackEndpoint: inlinePlaybackEndpointSchema.required(),
  searchVideoResultEntityKey: Joi.string().required(),
})
  .required()
  .meta({ className: 'Video' });
