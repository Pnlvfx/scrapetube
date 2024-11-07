/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export type Badges = MetadataBadgeRenderer[];

export interface BrowseEndpoint {
  browseId: string;
  canonicalBaseUrl?: string;
  params?: string;
}

export interface CommandMetadata {
  webCommandMetadata: WebCommandMetadata;
}

export interface LongBylineText {
  runs: {
    navigationEndpoint: NavigationEndpoint;
    text: string;
  }[];
}

export interface MetadataBadgeRenderer {
  metadataBadgeRenderer: {
    accessibilityData?: {
      label?: string;
    };
    groups?: string[];
    icon?: {
      iconType: 'CHECK_CIRCLE_THICK' | 'OFFICIAL_ARTIST_BADGE' | 'AUDIO_BADGE' | 'LIVE';
    };
    label?: string;
    style?: 'BADGE_STYLE_TYPE_VERIFIED' | 'BADGE_STYLE_TYPE_SIMPLE' | 'BADGE_STYLE_TYPE_VERIFIED_ARTIST' | 'BADGE_STYLE_TYPE_LIVE_NOW';
    tooltip?: string;
    trackingParams: string;
  };
}

export interface NavigationEndpoint {
  browseEndpoint?: BrowseEndpoint;
  clickTrackingParams?: string;
  commandMetadata?: CommandMetadata;
  params?: string;
  playerExtraUrlParams?: {
    key: string;
    value: string;
  }[];
  playerParams?: string;
  reelWatchEndpoint?: {
    loggingContext?: object;
    overlay: object;
    params?: string;
    playerExtraUrlParams?: {
      key: string;
      value: string;
    }[];
    playerParams?: string;
    sequenceParams: string;
    sequenceProvider: string;
    startTimeSeconds?: number;
    thumbnail: Thumbnail;
    ustreamerConfig?: string;
    videoId?: string;
    watchEndpointSupportedOnesieConfig?: {
      html5PlaybackOnesieConfig: {
        commonConfig: {
          url: string;
        };
      };
    };
  };
  signInEndpoint?: {
    continueAction: string;
    nextEndpoint?: {
      clickTrackingParams: string;
      commandMetadata?: CommandMetadata;
      searchEndpoint?: {
        params?: string;
        query: string;
      };
    };
  };
  startTimeSeconds?: number;
  videoId?: string;
  watchEndpoint?: {
    params?: string;
    playerExtraUrlParams?: {
      key: string;
      value: string;
    }[];
    playerParams?: string;
    startTimeSeconds?: number;
    videoId?: string;
    watchEndpointSupportedOnesieConfig?: {
      html5PlaybackOnesieConfig: {
        commonConfig: {
          url: string;
        };
      };
    };
  };
  watchEndpointSupportedOnesieConfig?: {
    html5PlaybackOnesieConfig: {
      commonConfig: {
        url: string;
      };
    };
  };
}

export interface Run {
  bold?: boolean;
  navigationEndpoint?: NavigationEndpoint;
  text: string;
}

export interface ShortBylineText {
  runs: {
    navigationEndpoint: NavigationEndpoint;
    text: string;
  }[];
}

export interface Thumbnail {
  isOriginalAspectRatio?: boolean;
  thumbnails: {
    height: number;
    url: string;
    width: number;
  }[];
}

export interface WebCommandMetadata {
  apiUrl?: string;
  rootVe?: number;
  sendPost?: boolean;
  url?: string;
  webPageType?: 'WEB_PAGE_TYPE_CHANNEL' | 'WEB_PAGE_TYPE_WATCH' | 'WEB_PAGE_TYPE_UNKNOWN' | 'WEB_PAGE_TYPE_SEARCH' | 'WEB_PAGE_TYPE_SHORTS';
}
