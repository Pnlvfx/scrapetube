import * as z from 'zod';
import { simpleText } from './shared.js';

export const playlistSchema = z.strictObject({ playlistId: z.string(), title: simpleText });

export type Playlist = z.infer<typeof playlistSchema>;
