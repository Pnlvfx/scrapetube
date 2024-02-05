interface StandardParameters {
  /**
   * V1 error format.
   */
  '$.xgafv'?: string;
  /**
   * OAuth access token.
   */
  access_token?: string;
  /**
   * Data format for response.
   */
  alt?: string;
  /**
   * JSONP
   */
  callback?: string;
  /**
   * Selector specifying which fields to include in a partial response.
   */
  fields?: string;
  /**
   * API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token.
   */
  key?: string;
  /**
   * OAuth 2.0 token for the current user.
   */
  oauth_token?: string;
  /**
   * Returns response with indentations and line breaks.
   */
  prettyPrint?: boolean;
  /**
   * Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters.
   */
  quotaUser?: string;
  /**
   * Legacy upload protocol for media (e.g. "media", "multipart").
   */
  uploadType?: string;
  /**
   * Upload protocol for media (e.g. "raw", "multipart").
   */
  upload_protocol?: string;
}

export interface Params$Resource$Search$List extends StandardParameters {
  /**
   * Filter on resources belonging to this channelId.
   */
  channelId?: string;
  /**
   * Add a filter on the channel search.
   */
  channelType?: string;
  /**
   * Filter on the livestream status of the videos.
   */
  eventType?: string;
  /**
   * Search owned by a content owner.
   */
  forContentOwner?: boolean;
  /**
   * Restrict the search to only retrieve videos uploaded using the project id of the authenticated user.
   */
  forDeveloper?: boolean;
  /**
   * Search for the private videos of the authenticated user.
   */
  forMine?: boolean;
  /**
   * Filter on location of the video
   */
  location?: string;
  /**
   * Filter on distance from the location (specified above).
   */
  locationRadius?: string;
  /**
   * The *maxResults* parameter specifies the maximum number of items that should be returned in the result set.
   */
  maxResults?: number;
  /**
   * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
   */
  onBehalfOfContentOwner?: string;
  /**
   * Sort order of the results.
   */
  order?: string;
  /**
   * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other pages that could be retrieved.
   */
  pageToken?: string;
  /**
   * The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet.
   */
  part?: string[];
  /**
   * Filter on resources published after this date.
   */
  publishedAfter?: string;
  /**
   * Filter on resources published before this date.
   */
  publishedBefore?: string;
  /**
   * Textual search terms to match.
   */
  q?: string;
  /**
   * Display the content as seen by viewers in this country.
   */
  regionCode?: string;
  /**
   * Search related to a resource.
   */
  relatedToVideoId?: string;
  /**
   * Return results relevant to this language.
   */
  relevanceLanguage?: string;
  /**
   * Indicates whether the search results should include restricted content as well as standard content.
   */
  safeSearch?: string;
  /**
   * Restrict results to a particular topic.
   */
  topicId?: string;
  /**
   * Restrict results to a particular set of resource types from One Platform.
   */
  type?: string[];
  /**
   * Filter on the presence of captions on the videos.
   */
  videoCaption?: string;
  /**
   * Filter on videos in a specific category.
   */
  videoCategoryId?: string;
  /**
   * Filter on the definition of the videos.
   */
  videoDefinition?: string;
  /**
   * Filter on 3d videos.
   */
  videoDimension?: string;
  /**
   * Filter on the duration of the videos.
   */
  videoDuration?: string;
  /**
   * Filter on embeddable videos.
   */
  videoEmbeddable?: string;
  /**
   * Filter on the license of the videos.
   */
  videoLicense?: string;
  /**
   * Filter on syndicated videos.
   */
  videoSyndicated?: string;
  /**
   * Filter on videos of a specific type.
   */
  videoType?: string;
}
