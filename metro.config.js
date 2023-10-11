const { getDefaultConfig } = require('@expo/metro-config');
const defaultConfig = getDefaultConfig(__dirname);


module.exports = {
  ...defaultConfig,
    resolver: {
      assetExts: ['jpg', 'png', 'mp4', 'ttf'], // Add or remove file extensions as needed
    },
  };