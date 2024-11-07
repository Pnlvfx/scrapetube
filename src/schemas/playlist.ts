import Joi from 'joi';
import { simpleText } from './channel.js';

export const playlistSchema = Joi.object({
  playlistId: Joi.string().required(),
  title: Joi.object(simpleText).required(),
}).meta({ className: 'Playlist' });
