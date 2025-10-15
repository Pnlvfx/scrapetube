import * as z from 'zod';

const clientSchema = z.strictObject({
  hl: z.string(),
  gl: z.string(),
  remoteHost: z.string(),
  deviceMake: z.string(),
  deviceModel: z.string(),
  visitorData: z.string(),
  userAgent: z.string(),
  clientName: z.string(),
  clientVersion: z.string(),
  osName: z.string(),
  osVersion: z.string(),
  originalUrl: z.string(),
  platform: z.string(),
  clientFormFactor: z.string(),
  configInfo: z.strictObject({ appInstallData: z.string() }),
  userInterfaceTheme: z.string(),
  browserName: z.string(),
  browserVersion: z.string(),
  acceptHeader: z.string(),
  deviceExperimentId: z.string(),
  rolloutToken: z.string(),
});

export const clientResponseSchema = z.strictObject({
  client: clientSchema,
  user: z.strictObject({ lockedSafetyMode: z.boolean() }),
  request: z.strictObject({ useSsl: z.boolean() }),
  clickTracking: z.strictObject({ clickTrackingParams: z.string() }),
});

export type Client = z.infer<typeof clientSchema>;
export type ClientResponse = z.infer<typeof clientResponseSchema>;
