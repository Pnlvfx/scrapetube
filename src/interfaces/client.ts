/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface Client {
  acceptHeader: string;
  browserName: string;
  browserVersion: string;
  clientFormFactor: string;
  clientName: string;
  clientVersion: string;
  configInfo: {
    appInstallData: string;
  };
  deviceExperimentId: string;
  deviceMake: string;
  deviceModel: string;
  gl: string;
  hl: string;
  originalUrl: string;
  osName: string;
  osVersion: string;
  platform: string;
  remoteHost: string;
  userAgent: string;
  userInterfaceTheme: string;
  visitorData: string;
}

export interface ClientResponse {
  clickTracking: {
    clickTrackingParams: string;
  };
  client: Client;
  request: {
    useSsl: boolean;
  };
  user: {
    lockedSafetyMode: boolean;
  };
}
