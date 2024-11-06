export const getContinuationEndpoint = () => {
  endpoint = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents.map(
    (c) => c.continuationItemRenderer?.continuationEndpoint,
  );
};
