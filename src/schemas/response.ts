import Joi from 'joi';
import { videoSchema } from './video.js';
import { channelSchema } from './channel.js';
import { commandMetadata } from './shared.js';
import { playlistSchema } from './playlist.js';

const responseContext = {
  serviceTrackingParams: Joi.array()
    .items(
      Joi.object({
        service: Joi.string().required(),
        params: Joi.array()
          .items(Joi.object({ key: Joi.string().required(), value: Joi.string().required() }))
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
};

const continuationEndpoint = {
  continuationCommand: Joi.object({
    token: Joi.string().required(),
    request: Joi.string().required(),
  }).required(),
  clickTrackingParams: Joi.string().required(),
  commandMetadata: commandMetadata.required(),
};

const continuationItemRenderer = {
  trigger: Joi.string().required(),
  continuationEndpoint: Joi.object(continuationEndpoint).required(),
  loggingDirectives: Joi.object({ trackingParams: Joi.string().required() }).required(),
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

export const initialDataSchema = Joi.object({
  responseContext: Joi.object(responseContext).required(),
  estimatedResults: Joi.string().required(),
  contents: Joi.object({
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
    }).required(),
  }),
  trackingParams: Joi.string().required(),
  header: Joi.object({
    searchHeaderRenderer: Joi.object({
      chipBar: Joi.object(chipBar),
      searchFilterButton: Joi.object(searchFilterButton).required(),
      trackingParams: Joi.string().required(),
      aboutTheseResultsButton: Joi.object(aboutTheseResultsButton).required(),
    }).required(),
  }).required(),
  topbar: Joi.object(topbar).required(),
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
}).meta({ className: 'InitialData' });
