import Joi from 'joi';

export const webCommandMetadataSchema = Joi.object({
  url: Joi.string(),
  webPageType: Joi.string().valid(
    'WEB_PAGE_TYPE_CHANNEL',
    'WEB_PAGE_TYPE_WATCH',
    'WEB_PAGE_TYPE_UNKNOWN',
    'WEB_PAGE_TYPE_SEARCH',
    'WEB_PAGE_TYPE_SHORTS',
  ),
  rootVe: Joi.number(),
  apiUrl: Joi.string(),
  sendPost: Joi.boolean(),
}).meta({ className: 'WebCommandMetadata' });

export const commandMetadata = Joi.object({
  webCommandMetadata: webCommandMetadataSchema.required(),
}).meta({ className: 'CommandMetadata' });

const browseEndpoint = {
  browseId: Joi.string().required(),
  canonicalBaseUrl: Joi.string(),
};

const signInEndpoint = {
  nextEndpoint: Joi.object({
    clickTrackingParams: Joi.string().required(),
    commandMetadata,
    searchEndpoint: Joi.object({ query: Joi.string().required(), params: Joi.string() }),
  }),
  continueAction: Joi.string().required(),
};

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
  startTimeSeconds: Joi.number(),
};

const reelWatchEndpointOverlay = undefined;
const loggingContext = undefined;

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
  isOriginalAspectRatio: Joi.boolean(),
}).meta({ className: 'Thumbnail' });

export const navigationEndpointSchema = Joi.object({
  ...watchEndpoint,
  clickTrackingParams: Joi.string(),
  commandMetadata,
  browseEndpoint: Joi.object(browseEndpoint), // for search channel
  watchEndpoint: Joi.object(watchEndpoint),
  signInEndpoint: Joi.object(signInEndpoint),
  reelWatchEndpoint: Joi.object({
    ...watchEndpoint,
    thumbnail: thumbnailSchema.required(),
    overlay: Joi.object(reelWatchEndpointOverlay).required(),
    sequenceProvider: Joi.string().required(),
    sequenceParams: Joi.string().required(),
    loggingContext: Joi.object(loggingContext),
    ustreamerConfig: Joi.string(),
  }),
}).meta({ className: 'NavigationEndpoint' });

export const runSchema = Joi.object({
  text: Joi.string().required(),
  bold: Joi.bool(),
  navigationEndpoint: navigationEndpointSchema,
}).meta({ className: 'Run' });

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
    icon: Joi.object({ iconType: Joi.string().valid('CHECK_CIRCLE_THICK', 'OFFICIAL_ARTIST_BADGE', 'AUDIO_BADGE', 'LIVE').required() }),
    style: Joi.string().valid(
      'BADGE_STYLE_TYPE_VERIFIED',
      'BADGE_STYLE_TYPE_SIMPLE',
      'BADGE_STYLE_TYPE_VERIFIED_ARTIST',
      'BADGE_STYLE_TYPE_LIVE_NOW',
    ),
    tooltip: Joi.string(),
    trackingParams: Joi.string().required(),
    accessibilityData: Joi.object({ label: Joi.string() }),
    groups: Joi.array().items(Joi.string()),
    label: Joi.string(),
  }).required(),
}).meta({ className: 'MetadataBadgeRenderer' });

export const badgesSchema = Joi.array().items(metadataBadgeRendererSchema.required()).meta({ className: 'Badges' });
