import Joi from 'joi';

export const webCommandMetadataSchema = Joi.object({
  url: Joi.string().required(),
  webPageType: Joi.string()
    .valid('WEB_PAGE_TYPE_CHANNEL', 'WEB_PAGE_TYPE_WATCH', 'WEB_PAGE_TYPE_UNKNOWN', 'WEB_PAGE_TYPE_SEARCH', 'WEB_PAGE_TYPE_SHORTS')
    .required(),
  rootVe: Joi.number().required(),
  apiUrl: Joi.string(),
}).meta({ className: 'WebCommandMetadata' });

export const browseEndpointSchema = Joi.object({
  browseId: Joi.string().required(),
  canonicalBaseUrl: Joi.string(),
}).meta({ className: 'BrowseEndpoint' });

export const signInEndpointSchema = Joi.object({
  nextEndpoint: Joi.object({
    clickTrackingParams: Joi.string().required(),
    commandMetadata: Joi.object({
      webCommandMetadata: webCommandMetadataSchema.required(),
    }),
    searchEndpoint: Joi.object({ query: Joi.string().required(), params: Joi.string() }),
  }),
  continueAction: Joi.string().required(),
}).meta({ className: 'SignInEndpoint' });

const watchEndpoint = {
  // for search video
  videoId: Joi.string(),
  params: Joi.string(),
  playerParams: Joi.string(),
  playerExtraUrlParams: Joi.array().items(Joi.object({ key: Joi.string().required(), value: Joi.string().required() })),
  watchEndpointSupportedOnesieConfig: Joi.object({
    html5PlaybackOnesieConfig: Joi.object({
      commonConfig: Joi.object({
        url: Joi.string().required(),
      }).required(),
    }).required(),
  }),
};

export const navigationEndpointSchema = Joi.object({
  ...watchEndpoint,
  clickTrackingParams: Joi.string(),
  commandMetadata: Joi.object({
    webCommandMetadata: webCommandMetadataSchema.required(),
  }),
  browseEndpoint: browseEndpointSchema, // for search channel
  watchEndpoint: Joi.object(watchEndpoint),
  signInEndpoint: signInEndpointSchema,
  reelWatchEndpoint: Joi.any(),
}).meta({ className: 'NavigationEndpoint' });

export const thumbnailSchema = Joi.object({
  thumbnails: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
      }),
    )
    .required(),
}).meta({ className: 'Thumbnail' });

export const runsSchema = Joi.array()
  .items(
    Joi.object({
      text: Joi.string().required(),
      bold: Joi.bool(),
      navigationEndpoint: navigationEndpointSchema,
    }),
  )
  .meta({ className: 'Runs' });

export const descriptionSnippetSchema = Joi.object({
  runs: runsSchema.required(),
}).meta({ className: 'DescriptionSnippet' });

export const shortBylineTextSchema = Joi.object({
  runs: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        navigationEndpoint: navigationEndpointSchema.required(),
      }),
    )
    .required(),
}).meta({ className: 'ShortBylineText' });

export const subscriberCountTextSchema = Joi.object({
  simpleText: Joi.string().required(),
}).meta({ className: 'SubscriberCountText' });

export const longBylineTextSchema = Joi.object({
  runs: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        navigationEndpoint: navigationEndpointSchema.required(),
      }),
    )
    .required(),
}).meta({ className: 'LongBylineText' });

export const metadataBadgeRendererSchema = Joi.object({
  metadataBadgeRenderer: Joi.object({
    icon: Joi.object({ iconType: Joi.string().valid('CHECK_CIRCLE_THICK', 'OFFICIAL_ARTIST_BADGE', 'AUDIO_BADGE').required() }),
    style: Joi.string().valid('BADGE_STYLE_TYPE_VERIFIED', 'BADGE_STYLE_TYPE_SIMPLE', 'BADGE_STYLE_TYPE_VERIFIED_ARTIST'),
    tooltip: Joi.string(),
    trackingParams: Joi.string().required(),
    accessibilityData: Joi.object({ label: Joi.string() }),
    groups: Joi.array().items(Joi.string()),
    label: Joi.string(),
  }).required(),
}).meta({ className: 'MetadataBadgeRenderer' });

export const badgesSchema = Joi.array().items(metadataBadgeRendererSchema.required()).meta({ className: 'Badges' });
