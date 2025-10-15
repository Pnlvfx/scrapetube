import * as z from 'zod';
import {
  badgesSchema,
  longBylineTextSchema,
  navigationEndpointSchema,
  runSchema,
  shortBylineTextSchema,
  simpleText,
  thumbnailWrapperSchema,
} from './shared.js';

const videoCountTextSchema = z.strictObject({
  accessibility: z.strictObject({
    accessibilityData: z.strictObject({
      label: z.string(),
    }),
  }),
  simpleText: z.string(),
  runs: z.array(runSchema),
});

const subscriptionButtonSchema = z.strictObject({ subscribed: z.boolean() });

const subscribeButtonSchema = z.strictObject({
  buttonRenderer: z.strictObject({
    style: z.literal('STYLE_DESTRUCTIVE'),
    size: z.literal('SIZE_DEFAULT'),
    isDisabled: z.boolean(),
    text: z.strictObject({
      runs: z.array(
        z.strictObject({
          text: z.string(),
        }),
      ),
    }),
    navigationEndpoint: navigationEndpointSchema,
    trackingParams: z.string(),
  }),
});

const descriptionSnippet = z.strictObject({ runs: z.array(runSchema) });

export const channelSchema = z.strictObject({
  channelId: z.string(),
  title: simpleText,
  navigationEndpoint: navigationEndpointSchema,
  thumbnail: thumbnailWrapperSchema,
  descriptionSnippet: descriptionSnippet,
  shortBylineText: shortBylineTextSchema,
  videoCountText: videoCountTextSchema,
  subscriptionButton: subscriptionButtonSchema,
  ownerBadges: badgesSchema,
  subscriberCountText: simpleText,
  subscribeButton: subscribeButtonSchema,
  trackingParams: z.string(),
  longBylineText: longBylineTextSchema,
});

export type Channel = z.infer<typeof channelSchema>;
