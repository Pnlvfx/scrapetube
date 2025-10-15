import * as z from 'zod';

export const webCommandMetadataSchema = z.strictObject({
  url: z.string(),
  webPageType: z.literal(['WEB_PAGE_TYPE_CHANNEL', 'WEB_PAGE_TYPE_WATCH', 'WEB_PAGE_TYPE_UNKNOWN', 'WEB_PAGE_TYPE_SEARCH', 'WEB_PAGE_TYPE_SHORTS']),
  rootVe: z.number(),
  apiUrl: z.string(),
  sendPost: z.boolean(),
});

export const commandMetadata = z.strictObject({ webCommandMetadata: webCommandMetadataSchema });
export const browseEndpointSchema = z.strictObject({ browseId: z.string(), params: z.string(), canonicalBaseUrl: z.string() });

const signInEndpoint = z.strictObject({
  nextEndpoint: z.strictObject({
    clickTrackingParams: z.string(),
    commandMetadata,
    searchEndpoint: z.strictObject({ query: z.string(), params: z.string() }),
  }),
  continueAction: z.string(),
});

const watchEndpoint = z.strictObject({
  // for search video
  videoId: z.string(),
  params: z.string(),
  playerParams: z.string(),
  playerExtraUrlParams: z.array(z.strictObject({ key: z.string(), value: z.string() })),
  watchEndpointSupportedOnesieConfig: z.strictObject({
    html5PlaybackOnesieConfig: z.strictObject({
      commonConfig: z.strictObject({
        url: z.string(),
      }),
    }),
  }),
  startTimeSeconds: z.number(),
});

export const thumbnailSchema = z.strictObject({ url: z.string(), width: z.number(), height: z.number() });
export const thumbnailWrapperSchema = z.strictObject({ thumbnails: z.array(thumbnailSchema), isOriginalAspectRatio: z.boolean() });

export const navigationEndpointSchema = z.strictObject({
  ...watchEndpoint.shape,
  clickTrackingParams: z.string(),
  commandMetadata,
  browseEndpoint: browseEndpointSchema, // for search channel
  watchEndpoint: watchEndpoint,
  signInEndpoint: signInEndpoint,
  reelWatchEndpoint: z.strictObject({
    ...watchEndpoint.shape,
    thumbnail: thumbnailWrapperSchema,
    overlay: z.strictObject({}),
    sequenceProvider: z.string(),
    sequenceParams: z.string(),
    loggingContext: z.strictObject({}),
    ustreamerConfig: z.string(),
  }),
});

export const runSchema = z.strictObject({ text: z.string(), bold: z.boolean(), navigationEndpoint: navigationEndpointSchema });

export const shortBylineTextSchema = z.strictObject({
  runs: z.array(
    z.strictObject({
      text: z.string(),
      navigationEndpoint: navigationEndpointSchema,
    }),
  ),
});

export const longBylineTextSchema = z.strictObject({
  runs: z.array(
    z.strictObject({
      text: z.string(),
      navigationEndpoint: navigationEndpointSchema,
    }),
  ),
});

export const metadataBadgeRendererSchema = z.strictObject({
  metadataBadgeRenderer: z.strictObject({
    icon: z.strictObject({ iconType: z.literal(['CHECK_CIRCLE_THICK', 'OFFICIAL_ARTIST_BADGE', 'AUDIO_BADGE', 'LIVE']) }),
    style: z.literal(['BADGE_STYLE_TYPE_VERIFIED', 'BADGE_STYLE_TYPE_SIMPLE', 'BADGE_STYLE_TYPE_VERIFIED_ARTIST', 'BADGE_STYLE_TYPE_LIVE_NOW']),
    tooltip: z.string(),
    trackingParams: z.string(),
    accessibilityData: z.strictObject({ label: z.string() }),
    groups: z.array(z.string()),
    label: z.string(),
  }),
});

export const badgesSchema = z.array(metadataBadgeRendererSchema);
export const simpleText = z.strictObject({ simpleText: z.string() });

export type Thumbnail = z.infer<typeof thumbnailSchema>;
