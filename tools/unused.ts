import { findUnusedExports } from '@goatjs/ts-unused-exports';

const unused = await findUnusedExports({
  ignoreFiles: ['eslint.config.js', 'jest.config.ts'],
  ignoreVars: [
    'ChannelOptions',
    'PlaylistOptions',
    'SearchOptions',
    'ChipCloudChipRenderer',
    'ItemSection',
    'videoCountTextSchema',
    'subscribeButtonSchema',
    'continuationEndpoint',
    'accessibilityDataSchema',
    'ownerTextSchema',
    'menuRendererSchema',
    'detailedMetadataSnippetsSchema',
    'subscriptionButtonSchema',
    'itemSectionRendererSchema',
    'viewCountTextSchema',
    'inlinePlaybackEndpointSchema',
    'avatarViewModelSchema',
    'channelThumbnailWithLinkRendererSchema',
    'titleSchema',
    'metadataBadgeRendererSchema',
    'chipCloudChipRenderer',
    'initialDataContentsSchema',
    'snippetSchema',
    'clientSchema',
    'feedFilterChipBarRenderer',
    'accessibilitySchema',
    'accessibilityDataWithObjectSchema',
    'lengthTextSchema',
    'initialDataSchema',
    'thumbnailSchema',
  ],
});

if (unused) {
  throw new Error(`The following exports are unused, add them on the ignore or remove the exports to continue.\n${JSON.stringify(unused)}`);
}
