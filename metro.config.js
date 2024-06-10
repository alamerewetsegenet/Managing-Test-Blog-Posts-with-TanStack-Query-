const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
  const defaultConfig = await getDefaultConfig(__dirname);
  return {
    resolver: {
      assetExts: [...defaultConfig.resolver.assetExts, 'svg']
    }
  };
})();
