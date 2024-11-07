import Joi from 'joi';
import { videoSchema } from './video.js';
import { channelSchema, simpleText } from './channel.js';
import { commandMetadata, navigationEndpointSchema } from './shared.js';
import { playlistSchema } from './playlist.js';

const responseContext = {
  serviceTrackingParams: Joi.array()
    .items(
      Joi.object({
        service: Joi.string().required(),
        params: Joi.array()
          .items(Joi.object({ key: Joi.string().required(), value: Joi.string().allow('').required() }))
          .required(),
      }),
    )
    .required(),
  mainAppWebResponseContext: Joi.object({
    loggedOut: Joi.boolean().required(),
    trackingParam: Joi.string().required(),
  }).required(),
  webResponseContextExtensionData: Joi.object({
    ytConfigData: Joi.object({ visitorData: Joi.string().required(), rootVisualElementType: Joi.number().required() }),
    hasDecorated: Joi.boolean().required(),
  }).required(),
  maxAgeSeconds: Joi.number(),
};

export const continuationEndpoint = Joi.object({
  continuationCommand: Joi.object({
    token: Joi.string().required(),
    request: Joi.string().required(),
  }).required(),
  clickTrackingParams: Joi.string().required(),
  commandMetadata: commandMetadata.required(),
}).meta({ className: 'ContinuationEndpoint' });

const continuationItemRenderer = {
  trigger: Joi.string().required(),
  continuationEndpoint: continuationEndpoint.required(),
  loggingDirectives: Joi.object({ trackingParams: Joi.string().required() }),
};

/** @TODO Fill in this objects. Check nested too. */
const adSlotRenderer = {
  adSlotMetadata: Joi.object().required(),
  fulfillmentContent: Joi.object().required(),
  enablePacfLoggingWeb: Joi.boolean().required(),
  trackingParams: Joi.string().required(),
};

/** @TODO Fill in this objects. */
const reelShelfRenderer = undefined;
const radioRenderer = undefined;
const shelfRenderer = undefined;
const subMenu = undefined;
const chipBar = undefined;
const searchFilterButton = undefined;
const aboutTheseResultsButton = undefined;
const topbar = undefined;
const lockupViewModel = undefined;
const adSlotAndLayoutMetadata = undefined;
const horizontalCardListRenderer = undefined;
const movieRenderer = undefined;

const richItemRenderer = undefined;

export const chipCloudChipRenderer = Joi.object({
  text: Joi.object(simpleText).required(),
}).meta({ className: 'ChipCloudChipRenderer' });

export const feedFilterChipBarRenderer = Joi.object({
  contents: Joi.array()
    .items(Joi.object({ chipCloudChipRenderer: chipCloudChipRenderer.required() }))
    .required(),
}).meta({ className: 'FeedFilterChipBarRenderer' });

const contentsRender = {
  videoRenderer: videoSchema,
  channelRenderer: channelSchema,
  playlistRenderer: playlistSchema,
  adSlotRenderer: Joi.object(adSlotRenderer),
  reelShelfRenderer: Joi.object(reelShelfRenderer),
  radioRenderer: Joi.object(radioRenderer),
  shelfRenderer: Joi.object(shelfRenderer),
  lockupViewModel: Joi.object(lockupViewModel),
  movieRenderer: Joi.object(movieRenderer),
  horizontalCardListRenderer: Joi.object(horizontalCardListRenderer),
  richItemRenderer: Joi.object(richItemRenderer),
  continuationItemRenderer: Joi.object(continuationItemRenderer),
};

// from search channel request
const tabRenderer = {
  endpoint: navigationEndpointSchema.required(),
  title: Joi.string().required(),
  trackingParams: Joi.string().required(),
  selected: Joi.boolean(),
  content: Joi.object({
    richGridRenderer: Joi.object({
      contents: Joi.array().items(Joi.object(contentsRender)).required(),
      trackingParams: Joi.string().required(),
      header: Joi.object({ feedFilterChipBarRenderer: feedFilterChipBarRenderer.required() }).required(),
    }).required(),
  }),
};
const expandableTabRenderer = {};
const pageHeaderRenderer = {};
const metadata = {};
const microformat = {};
const onResponseReceivedActions = {};

const channelRequestContent = {
  tabRenderer: Joi.object(tabRenderer),
  expandableTabRenderer: Joi.object(expandableTabRenderer),
};

export const itemSectionRendererSchema = Joi.object({
  contents: Joi.array().items(Joi.object(contentsRender)).required(),
  trackingParams: Joi.string().required(),
}).meta({ className: 'ItemSection' });

const appendContinuationItemsAction = {
  continuationItems: Joi.array()
    .items(
      Joi.object({
        itemSectionRenderer: itemSectionRendererSchema,
        continuationItemRenderer: Joi.object(continuationItemRenderer),
      }),
    )
    .required(),
  targetId: Joi.string(),
};

export const initialDataContentsSchema = Joi.object({
  twoColumnSearchResultsRenderer: Joi.object({
    primaryContents: Joi.object({
      sectionListRenderer: Joi.object({
        contents: Joi.array()
          .items(
            Joi.object({
              itemSectionRenderer: itemSectionRendererSchema,
              continuationItemRenderer: Joi.object(continuationItemRenderer),
            }),
          )
          .required(),
        trackingParams: Joi.string().required(),
        subMenu: Joi.object(subMenu).required(),
        hideBottomSeparator: Joi.boolean().required(),
        targetId: Joi.string().required(),
      }).required(),
    }).required(),
  }),
  twoColumnBrowseResultsRenderer: Joi.object({
    tabs: Joi.array().items(Joi.object(channelRequestContent)).required(),
  }),
}).meta({ className: 'InitialDataContents' });

export const initialDataSchema = Joi.object({
  responseContext: Joi.object(responseContext).required(),
  estimatedResults: Joi.string(),
  contents: initialDataContentsSchema,
  trackingParams: Joi.string().required(),
  header: Joi.object({
    searchHeaderRenderer: Joi.object({
      chipBar: Joi.object(chipBar),
      searchFilterButton: Joi.object(searchFilterButton).required(),
      trackingParams: Joi.string().required(),
      aboutTheseResultsButton: Joi.object(aboutTheseResultsButton).required(),
    }),
    pageHeaderRenderer: Joi.object(pageHeaderRenderer),
  }),
  topbar: Joi.object(topbar),
  refinements: Joi.array().items(Joi.string()),
  onResponseReceivedCommands: Joi.array().items(
    Joi.object({
      clickTrackingParams: Joi.string().required(),
      adsControlFlowOpportunityReceivedCommand: Joi.object({
        opportunityType: Joi.string(),
        isInitialLoad: Joi.boolean(),
        adSlotAndLayoutMetadata: Joi.array().items(Joi.object(adSlotAndLayoutMetadata)),
        enablePacfLoggingWeb: Joi.boolean(),
      }),
      appendContinuationItemsAction: Joi.object(appendContinuationItemsAction),
    }),
  ),
  targetId: Joi.string(),
  metadata: Joi.object(metadata),
  microformat: Joi.object(microformat),
  onResponseReceivedActions: Joi.array().items(Joi.object(onResponseReceivedActions)),
}).meta({ className: 'InitialData' });
