export interface Client {
  client: {
    hl: string;
    gl: string;
    remoteHost: string;
    deviceMake: string;
    deviceModel: string;
    visitorData: string;
    userAgent: string;
    clientName: string;
    clientVersion: string;
    osName: string;
    osVersion: string;
    originalUrl: string;
    platform: string;
    clientFormFactor: string;
    configInfo: Record<string, unknown>;
    userInterfaceTheme: string;
    browserName: string;
    browserVersion: string;
    acceptHeader: string;
    deviceExperimentId: string;
  };
  user: { lockedSafetyMode: boolean };
  request: { useSsl: boolean };
  clickTracking: { clickTrackingParams: string };
}
