/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

import { DescriptionSnippet, LongBylineText, NavigationEndpoint, Badges, ShortBylineText, SubscriberCountText, Thumbnail, Runs } from './shared';

export interface Channel {
  channelId: string;
  descriptionSnippet?: DescriptionSnippet;
  longBylineText: LongBylineText;
  navigationEndpoint: NavigationEndpoint;
  ownerBadges?: Badges;
  shortBylineText: ShortBylineText;
  subscribeButton: SubscribeButton;
  subscriberCountText?: SubscriberCountText;
  subscriptionButton: SubscriptionButton;
  thumbnail: Thumbnail;
  title: ChannelTitle;
  trackingParams: string;
  videoCountText: VideoCountText;
}

export interface ChannelTitle {
  simpleText: string;
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
  runs?: Runs;
  simpleText?: string;
}
