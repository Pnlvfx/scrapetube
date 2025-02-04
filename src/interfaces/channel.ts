/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { Run, LongBylineText, NavigationEndpoint, Badges, ShortBylineText, ThumbnailWrapper } from './shared.js';

export interface Channel {
  channelId: string;
  descriptionSnippet?: {
    runs: Run[];
  };
  longBylineText: LongBylineText;
  navigationEndpoint: NavigationEndpoint;
  ownerBadges?: Badges;
  shortBylineText: ShortBylineText;
  subscribeButton: SubscribeButton;
  subscriberCountText?: {
    simpleText: string;
  };
  subscriptionButton: SubscriptionButton;
  thumbnail: ThumbnailWrapper;
  title: {
    simpleText: string;
  };
  trackingParams: string;
  videoCountText: VideoCountText;
}

export interface SubscribeButton {
  buttonRenderer: {
    isDisabled: boolean;
    navigationEndpoint: NavigationEndpoint;
    size: 'SIZE_DEFAULT';
    style: 'STYLE_DESTRUCTIVE';
    text: {
      runs: {
        text: string;
      }[];
    };
    trackingParams: string;
  };
}

export interface SubscriptionButton {
  subscribed: boolean;
}

export interface VideoCountText {
  accessibility?: {
    accessibilityData: {
      label: string;
    };
  };
  runs?: Run[];
  simpleText?: string;
}
