export const sort_by_map = {
  relevance: 'A',
  upload_date: 'I',
  view_count: 'M',
  rating: 'E',
};

export const results_type_map = {
  video: ['B', 'videoRenderer'],
  channel: ['C', 'channelRenderer'],
  playlist: ['D', 'playlistRenderer'],
  movie: ['E', 'videoRenderer'],
};

export interface YoutubeVideo {
  videoId: string;
  title: string;
  views: string;
  publishedTime: string;
}
