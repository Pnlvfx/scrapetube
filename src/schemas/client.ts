import Joi from 'joi';

export const clientSchema = Joi.object({
  hl: Joi.string().required(),
  gl: Joi.string().required(),
  remoteHost: Joi.string().required(),
  deviceMake: Joi.string().required(),
  deviceModel: Joi.string().allow('').required(),
  visitorData: Joi.string().required(),
  userAgent: Joi.string().required(),
  clientName: Joi.string().required(),
  clientVersion: Joi.string().required(),
  osName: Joi.string().required(),
  osVersion: Joi.string().required(),
  originalUrl: Joi.string().required(),
  platform: Joi.string().required(),
  clientFormFactor: Joi.string().required(),
  configInfo: Joi.object({
    appInstallData: Joi.string().required(),
  }).required(),
  userInterfaceTheme: Joi.string().required(),
  browserName: Joi.string().required(),
  browserVersion: Joi.string().required(),
  acceptHeader: Joi.string().required(),
  deviceExperimentId: Joi.string().required(),
  rolloutToken: Joi.string(),
}).meta({ className: 'Client' });

export const clientResponseSchema = Joi.object({
  client: clientSchema.required(),
  user: Joi.object({ lockedSafetyMode: Joi.boolean().required() }).required(),
  request: Joi.object({ useSsl: Joi.boolean().required() }).required(),
  clickTracking: Joi.object({ clickTrackingParams: Joi.string().required() }).required(),
}).meta({ className: 'ClientResponse' });
