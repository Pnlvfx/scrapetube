import Joi from 'joi';
import { longBylineTextSchema, navigationEndpointSchema, runsSchema, shortBylineTextSchema, thumbnailSchema, titleSchema } from './shared.js';

export const accessibilityDataSchema = Joi.object({
  label: Joi.string().required(),
})
  .required()
  .meta({ className: 'AccessibilityData' });

export const publishedTimeTextSchema = Joi.object({
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'PublishedTimeText' });

export const lengthTextSchema = Joi.object({
  accessibility: accessibilityDataSchema,
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'LengthText' });

export const viewCountTextSchema = Joi.object({
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'ViewCountText' });

export const metadataBadgeRendererSchema = Joi.object({
  metadataBadgeRenderer: Joi.object({
    // Add properties as needed
  }).required(),
})
  .required()
  .meta({ className: 'MetadataBadgeRenderer' });

export const badgesSchema = Joi.array().items(metadataBadgeRendererSchema).required().meta({ className: 'Badges' });

export const ownerBadgesSchema = Joi.array().items(metadataBadgeRendererSchema).required().meta({ className: 'OwnerBadges' });

export const ownerTextSchema = Joi.object({
  runs: runsSchema,
})
  .required()
  .meta({ className: 'OwnerText' });

export const accessibilityDataWithObjectSchema = Joi.object({
  accessibilityData: accessibilityDataSchema,
})
  .required()
  .meta({ className: 'AccessibilityDataWithObject' });

export const menuRendererSchema = Joi.object({
  menuRenderer: Joi.object({
    items: Joi.array().items(
      Joi.object({
        // Add properties as needed
      }),
    ),
    trackingParams: Joi.string().required(),
    accessibility: accessibilityDataSchema,
  }).required(),
})
  .required()
  .meta({ className: 'MenuRenderer' });

export const channelThumbnailWithLinkRendererSchema = Joi.object({
  channelThumbnailWithLinkRenderer: Joi.object({
    thumbnail: thumbnailSchema.required(),
    navigationEndpoint: navigationEndpointSchema.required(),
    accessibility: accessibilityDataSchema,
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

export const movingThumbnailDetailsSchema = Joi.object({
  movingThumbnailDetails: Joi.object({
    // Add properties as needed
  }).required(),
})
  .required()
  .meta({ className: 'MovingThumbnailDetails' });

export const inlinePlaybackEndpointSchema = Joi.object({
  clickTrackingParams: Joi.string().required(),
  commandMetadata: Joi.object({
    webCommandMetadata: Joi.object({
      // Add properties as needed
    }).required(),
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

export const detailedMetadataSnippetsSchema = Joi.array().items(snippetSchema).required().required().meta({ className: 'DetailedMetadataSnippets' });

export const videoSchema = Joi.object({
  videoId: Joi.string().required(),
  thumbnail: thumbnailSchema.required(),
  title: titleSchema.required(),
  longBylineText: longBylineTextSchema.required(),
  publishedTimeText: publishedTimeTextSchema.required(),
  lengthText: lengthTextSchema.required(),
  viewCountText: viewCountTextSchema.required(),
  navigationEndpoint: navigationEndpointSchema.required(),
  badges: badgesSchema.required(),
  ownerBadges: ownerBadgesSchema.required(),
  ownerText: ownerTextSchema.required(),
  shortBylineText: shortBylineTextSchema.required(),
  trackingParams: Joi.string().required(),
  showActionMenu: Joi.boolean().required(),
  shortViewCountText: accessibilityDataWithObjectSchema.required(),
  menu: menuRendererSchema.required(),
  channelThumbnailSupportedRenderers: channelThumbnailWithLinkRendererSchema.required(),
  thumbnailOverlays: Joi.array()
    .items(
      thumbnailOverlayTimeStatusRendererSchema,
      thumbnailOverlayToggleButtonRendererSchema,
      thumbnailOverlayToggleButtonRendererSchema,
      thumbnailOverlayNowPlayingRendererSchema,
      thumbnailOverlayLoadingPreviewRendererSchema,
    )
    .required(),
  richThumbnail: Joi.object({
    movingThumbnailRenderer: movingThumbnailDetailsSchema.required(),
  }).required(),
  detailedMetadataSnippets: detailedMetadataSnippetsSchema.required(),
  inlinePlaybackEndpoint: inlinePlaybackEndpointSchema.required(),
  searchVideoResultEntityKey: Joi.string().required(),
})
  .required()
  .meta({ className: 'Video' });
