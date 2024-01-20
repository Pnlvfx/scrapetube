import Joi from 'joi';

export const titleSchema = Joi.object({
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'Title' });

export const webCommandMetadataSchema = Joi.object({
  url: Joi.string().required(),
  webPageType: Joi.string().valid('WEB_PAGE_TYPE_CHANNEL').required(),
  rootVe: Joi.number().required(),
  apiUrl: Joi.string().required(),
})
  .required()
  .meta({ className: 'WebCommandMetadata' });

export const browseEndpointSchema = Joi.object({
  browseId: Joi.string().required(),
  canonicalBaseUrl: Joi.string().required(),
})
  .required()
  .meta({ className: 'BrowseEndpoint' });

export const navigationEndpointSchema = Joi.object({
  clickTrackingParams: Joi.string().required(),
  commandMetadata: Joi.object({
    webCommandMetadata: webCommandMetadataSchema.required(),
  }).required(),
  browseEndpoint: browseEndpointSchema.required(),
})
  .required()
  .meta({ className: 'NavigationEndpoint' });

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
})
  .required()
  .meta({ className: 'Thumbnail' });

export const runsSchema = Joi.array()
  .items(
    Joi.object({
      text: Joi.string().required(),
    }),
  )
  .required()
  .meta({ className: 'Runs' });

export const descriptionSnippetSchema = Joi.object({
  runs: runsSchema.required(),
})
  .required()
  .meta({ className: 'DescriptionSnippet' });

export const shortBylineTextSchema = Joi.object({
  runs: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        navigationEndpoint: navigationEndpointSchema.required(),
      }),
    )
    .required(),
})
  .required()
  .meta({ className: 'ShortBylineText' });

export const videoCountTextSchema = Joi.object({
  accessibility: Joi.object({
    accessibilityData: Joi.object({
      label: Joi.string().required(),
    }).required(),
  }).required(),
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'VideoCountText' });

export const subscriptionButtonSchema = Joi.object({
  subscribed: Joi.boolean().required(),
})
  .required()
  .meta({ className: 'SubscriptionButton' });

export const subscriberCountTextSchema = Joi.object({
  simpleText: Joi.string().required(),
})
  .required()
  .meta({ className: 'SubscriberCountText' });

export const subscribeButtonSchema = Joi.object({
  buttonRenderer: Joi.object({
    style: Joi.string().valid('STYLE_DESTRUCTIVE').required(),
    size: Joi.string().valid('SIZE_DEFAULT').required(),
    isDisabled: Joi.boolean().required(),
    text: Joi.object({
      runs: Joi.array()
        .items(
          Joi.object({
            text: Joi.string().required(),
          }),
        )
        .required(),
    }).required(),
    navigationEndpoint: navigationEndpointSchema.required(),
    trackingParams: Joi.string().required(),
  }).required(),
})
  .required()
  .meta({ className: 'subscribeButton' });

export const longBylineTextSchema = Joi.object({
  runs: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        navigationEndpoint: navigationEndpointSchema.required(),
      }),
    )
    .required(),
})
  .required()
  .meta({ className: 'LongBylineText' });
