import * as z from 'zod';
import {
  badgesSchema,
  browseEndpointSchema,
  commandMetadata,
  longBylineTextSchema,
  navigationEndpointSchema,
  runSchema,
  shortBylineTextSchema,
  simpleText,
  thumbnailWrapperSchema,
  webCommandMetadataSchema,
} from './shared.js';

const accessibilityDataSchema = z.strictObject({ label: z.string() });
const accessibilitySchema = z.strictObject({ accessibilityData: accessibilityDataSchema });
const titleSchema = z.strictObject({ runs: z.array(runSchema), accessibility: accessibilitySchema });
const lengthTextSchema = z.strictObject({ ...simpleText.shape, accessibility: accessibilitySchema });
const viewCountTextSchema = z.strictObject({ simpleText: z.string(), runs: z.array(runSchema) });
const ownerTextSchema = z.strictObject({ runs: z.array(runSchema) });

const accessibilityDataWithObjectSchema = z.strictObject({
  accessibility: accessibilitySchema,
  simpleText: z.string(),
  runs: z.array(runSchema),
});

const menuSchema = z.strictObject({});
const accessibility = z.strictObject({});
const thumbnailOverlay = z.strictObject({});
const movingThumbnailRenderer = z.strictObject({});
const snippetTimestamp = z.strictObject({});
const timestampEndpoint = z.strictObject({});

const menuRendererSchema = z.strictObject({
  menuRenderer: z.strictObject({
    items: z.array(menuSchema),
    trackingParams: z.string(),
    accessibility,
  }),
});

const channelThumbnailWithLinkRendererSchema = z.strictObject({
  channelThumbnailWithLinkRenderer: z.strictObject({
    thumbnail: thumbnailWrapperSchema,
    navigationEndpoint: navigationEndpointSchema,
    accessibility,
  }),
});

const inlinePlaybackEndpointSchema = z.strictObject({
  clickTrackingParams: z.string(),
  commandMetadata: commandMetadata,
  watchEndpoint: navigationEndpointSchema,
});

const snippetSchema = z.strictObject({
  snippetText: accessibilityDataWithObjectSchema,
  snippetHoverText: accessibilityDataWithObjectSchema,
  snippetTimestamp,
  maxOneLine: z.boolean(),
  timestampEndpoint,
});

const detailedMetadataSnippetsSchema = z.array(snippetSchema);

const avatarViewModelSchema = z.strictObject({
  image: z.strictObject({
    sources: z.array(z.strictObject({ url: z.string(), width: z.number(), height: z.number() })),
  }),
  avatarImageSize: z.literal('AVATAR_SIZE_M'),
});

export const videoSchema = z.strictObject({
  videoId: z.string(),
  thumbnail: thumbnailWrapperSchema,
  title: titleSchema,
  longBylineText: longBylineTextSchema,
  publishedTimeText: simpleText,
  lengthText: lengthTextSchema,
  viewCountText: viewCountTextSchema,
  navigationEndpoint: navigationEndpointSchema,
  badges: badgesSchema,
  ownerBadges: badgesSchema,
  ownerText: ownerTextSchema,
  shortBylineText: shortBylineTextSchema,
  trackingParams: z.string(),
  showActionMenu: z.boolean(),
  shortViewCountText: accessibilityDataWithObjectSchema,
  menu: menuRendererSchema,
  channelThumbnailSupportedRenderers: channelThumbnailWithLinkRendererSchema,
  thumbnailOverlays: z.array(thumbnailOverlay),
  richThumbnail: z.strictObject({
    movingThumbnailRenderer: movingThumbnailRenderer,
  }),
  detailedMetadataSnippets: detailedMetadataSnippetsSchema,
  expandableMetadata: z.strictObject({}),
  inlinePlaybackEndpoint: inlinePlaybackEndpointSchema,
  searchVideoResultEntityKey: z.string(),
  avatar: z.strictObject({
    avatarViewModel: avatarViewModelSchema,
    decoratedAvatarViewModel: z.strictObject({
      avatar: z.strictObject({ avatarViewModel: avatarViewModelSchema }),
      a11yLabel: z.string(),
      rendererContext: z.strictObject({
        commandContext: z.strictObject({
          onTap: z.strictObject({
            innertubeCommand: z.strictObject({
              clickTrackingParams: z.string(),
              commandMetadata: z.strictObject({
                url: z.string(),
                webPageType: z.string(),
                rootVe: z.number(),
                apiUrl: z.string(),
                webCommandMetadata: webCommandMetadataSchema,
              }),
              browseEndpoint: browseEndpointSchema,
            }),
          }),
        }),
      }),
    }),
  }),
});

export type Video = z.infer<typeof videoSchema>;
