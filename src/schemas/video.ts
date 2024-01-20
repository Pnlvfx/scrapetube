import Joi from 'joi';

export const videoSchema = Joi.object({
  channelId: Joi.string().required(),
  title: Joi.object({
    simpleText: Joi.string().required(),
  }).required(),
  navigationEndpoint: Joi.object({
    clickTrackingParams: Joi.string().required(),
    commandMetadata: Joi.object({
      webCommandMetadata: Joi.object({
        url: Joi.string().required(),
        webPageType: Joi.string().valid('WEB_PAGE_TYPE_CHANNEL').required(),
        rootVe: Joi.number().required(),
        apiUrl: Joi.string().required(),
      }).required(),
    }).required(),
    browseEndpoint: Joi.object({
      browseId: Joi.string().required(),
      canonicalBaseUrl: Joi.string().required(),
    }).required(),
  }).required(),
  thumbnail: Joi.object({
    thumbnails: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required(),
          width: Joi.number().required(),
          height: Joi.number().required(),
        }),
      )
      .required(),
  }).required(),
  descriptionSnippet: Joi.object({
    runs: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().required(),
        }),
      )
      .required(),
  }).required(),
  shortBylineText: Joi.object({
    runs: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().required(),
          navigationEndpoint: Joi.object({
            clickTrackingParams: Joi.string().required(),
            commandMetadata: Joi.object({
              webCommandMetadata: Joi.object({
                url: Joi.string().required(),
                webPageType: Joi.string().valid('WEB_PAGE_TYPE_CHANNEL').required(),
                rootVe: Joi.number().required(),
                apiUrl: Joi.string().required(),
              }).required(),
            }).required(),
            browseEndpoint: Joi.object({
              browseId: Joi.string().required(),
              canonicalBaseUrl: Joi.string().required(),
            }).required(),
          }),
        }),
      )
      .required(),
  }).required(),
  videoCountText: Joi.object({
    accessibility: Joi.object({
      accessibilityData: Joi.object({
        label: Joi.string().required(),
      }).required(),
    }).required(),
    simpleText: Joi.string().required(),
  }).required(),
  subscriptionButton: Joi.object({
    subscribed: Joi.boolean().required(),
  }).required(),
  subscriberCountText: Joi.object({
    simpleText: Joi.string().required(),
  }).required(),
  subscribeButton: Joi.object({
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
      navigationEndpoint: Joi.object({
        clickTrackingParams: Joi.string().required(),
        commandMetadata: Joi.object({
          webCommandMetadata: Joi.object({
            url: Joi.string().required(),
            webPageType: Joi.string().valid('WEB_PAGE_TYPE_UNKNOWN').required(),
            rootVe: Joi.number().required(),
          }).required(),
        }).required(),
        signInEndpoint: Joi.object({
          nextEndpoint: Joi.object({
            clickTrackingParams: Joi.string().required(),
            commandMetadata: Joi.object({
              webCommandMetadata: Joi.object({
                url: Joi.string().required(),
                webPageType: Joi.string().valid('WEB_PAGE_TYPE_SEARCH').required(),
                rootVe: Joi.number().required(),
              }).required(),
            }).required(),
            searchEndpoint: Joi.object({
              query: Joi.string().required(),
              params: Joi.string().required(),
            }).required(),
          }).required(),
          continueAction: Joi.string().required(),
        }).required(),
      }).required(),
      trackingParams: Joi.string().required(),
    }).required(),
  }).required(),
  trackingParams: Joi.string().required(),
  longBylineText: Joi.object({
    runs: Joi.array()
      .items(
        Joi.object({
          text: Joi.string().required(),
          navigationEndpoint: Joi.object({
            clickTrackingParams: Joi.string().required(),
            commandMetadata: Joi.object({
              webCommandMetadata: Joi.object({
                url: Joi.string().required(),
                webPageType: Joi.string().valid('WEB_PAGE_TYPE_CHANNEL').required(),
                rootVe: Joi.number().required(),
                apiUrl: Joi.string().required(),
              }).required(),
            }).required(),
            browseEndpoint: Joi.object({
              browseId: Joi.string().required(),
              canonicalBaseUrl: Joi.string().required(),
            }).required(),
          }),
        }),
      )
      .required(),
  }).required(),
}).meta({ className: 'video' });
