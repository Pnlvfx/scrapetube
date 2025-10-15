import * as z from 'zod';
import { videoSchema } from './video.js';
import { channelSchema } from './channel.js';
import { commandMetadata, navigationEndpointSchema, simpleText } from './shared.js';
import { playlistSchema } from './playlist.js';

const responseContext = z.strictObject({
  serviceTrackingParams: z.array(z.strictObject({ service: z.string(), params: z.array(z.strictObject({ key: z.string(), value: z.string() })) })),
  mainAppWebResponseContext: z.strictObject({ loggedOut: z.boolean(), trackingParam: z.string() }),
  webResponseContextExtensionData: z.strictObject({
    ytConfigData: z.strictObject({ visitorData: z.string(), rootVisualElementType: z.number() }),
    hasDecorated: z.boolean(),
  }),
  maxAgeSeconds: z.number(),
});

const continuationEndpoint = z.strictObject({
  continuationCommand: z.strictObject({
    token: z.string(),
    request: z.string(),
  }),
  clickTrackingParams: z.string(),
  commandMetadata: commandMetadata,
});

const continuationItemRenderer = z.strictObject({
  trigger: z.string(),
  continuationEndpoint: continuationEndpoint,
  loggingDirectives: z.strictObject({ trackingParams: z.string() }),
});

const adSlotRenderer = z.strictObject({
  adSlotMetadata: z.strictObject({}),
  fulfillmentContent: z.strictObject({}),
  enablePacfLoggingWeb: z.boolean(),
  trackingParams: z.string(),
});

const reelShelfRenderer = z.strictObject({});
const radioRenderer = z.strictObject({});
const shelfRenderer = z.strictObject({});
const subMenu = z.strictObject({});
const chipBar = z.strictObject({});
const searchFilterButton = z.strictObject({});
const aboutTheseResultsButton = z.strictObject({});
const topbar = z.strictObject({});
const lockupViewModel = z.strictObject({});
const adSlotAndLayoutMetadata = z.strictObject({});
const horizontalCardListRenderer = z.strictObject({});
const movieRenderer = z.strictObject({});
const richItemRenderer = z.strictObject({});

const chipCloudChipRenderer = z.strictObject({ text: simpleText });
const feedFilterChipBarRenderer = z.strictObject({ contents: z.array(z.strictObject({ chipCloudChipRenderer: chipCloudChipRenderer })) });

const contentsRender = z.strictObject({
  videoRenderer: videoSchema,
  channelRenderer: channelSchema,
  playlistRenderer: playlistSchema,
  adSlotRenderer,
  reelShelfRenderer,
  radioRenderer,
  shelfRenderer,
  lockupViewModel,
  movieRenderer,
  horizontalCardListRenderer,
  richItemRenderer,
  continuationItemRenderer,
});

// from search channel request
const tabRenderer = z.strictObject({
  endpoint: navigationEndpointSchema,
  title: z.string(),
  trackingParams: z.string(),
  selected: z.boolean(),
  content: z.strictObject({
    richGridRenderer: z.strictObject({
      contents: z.array(contentsRender),
      trackingParams: z.string(),
      header: z.strictObject({ feedFilterChipBarRenderer: feedFilterChipBarRenderer }),
    }),
  }),
});

const expandableTabRenderer = z.strictObject({});
const pageHeaderRenderer = z.strictObject({});
const metadata = z.strictObject({});
const microformat = z.strictObject({});
const onResponseReceivedActions = z.strictObject({});

const channelRequestContent = z.strictObject({ tabRenderer, expandableTabRenderer });
const itemSectionRendererSchema = z.strictObject({ contents: z.array(contentsRender), trackingParams: z.string() });

const appendContinuationItemsAction = {
  continuationItems: z.array(z.strictObject({ itemSectionRenderer: itemSectionRendererSchema, continuationItemRenderer })),
  targetId: z.string(),
};

const initialDataContentsSchema = z.strictObject({
  twoColumnSearchResultsRenderer: z.strictObject({
    primaryContents: z.strictObject({
      sectionListRenderer: z.strictObject({
        contents: z.array(z.strictObject({ itemSectionRenderer: itemSectionRendererSchema, continuationItemRenderer })),
        trackingParams: z.string(),
        subMenu,
        hideBottomSeparator: z.boolean(),
        targetId: z.string(),
      }),
    }),
  }),
  twoColumnBrowseResultsRenderer: z.strictObject({ tabs: z.array(channelRequestContent) }),
});

export const initialDataSchema = z.strictObject({
  responseContext,
  estimatedResults: z.string(),
  contents: initialDataContentsSchema,
  trackingParams: z.string(),
  header: z.strictObject({
    searchHeaderRenderer: z.strictObject({
      chipBar,
      searchFilterButton,
      trackingParams: z.string(),
      aboutTheseResultsButton,
    }),
    pageHeaderRenderer,
  }),
  topbar,
  refinements: z.array(z.string()),
  onResponseReceivedCommands: z.array(
    z.strictObject({
      clickTrackingParams: z.string(),
      adsControlFlowOpportunityReceivedCommand: z.strictObject({
        opportunityType: z.string(),
        isInitialLoad: z.boolean(),
        adSlotAndLayoutMetadata: z.array(adSlotAndLayoutMetadata),
        enablePacfLoggingWeb: z.boolean(),
      }),
      appendContinuationItemsAction,
    }),
  ),
  targetId: z.string(),
  metadata,
  microformat,
  onResponseReceivedActions: z.array(onResponseReceivedActions),
});

export type FeedFilterChipBarRenderer = z.infer<typeof feedFilterChipBarRenderer>;
export type ContinuationEndpoint = z.infer<typeof continuationEndpoint>;
export type InitialDataContents = z.infer<typeof initialDataContentsSchema>;
export type InitialData = z.infer<typeof initialDataSchema>;
