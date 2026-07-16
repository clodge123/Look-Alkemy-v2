const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure all JS files are properly resolved
config.resolver.sourceExts = ['js', 'jsx', 'ts', 'tsx'];

module.exports = config;
