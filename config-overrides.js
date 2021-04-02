const { alias, configPaths } = require('react-app-rewire-alias');

module.exports = function override(config) {
  config.optimization.splitChunks = {
    chunks: 'all',
    maxSize: 250000,
    minSize: 150000,
  };
  config.output = {
    ...config.output,
    chunkFilename: 'chunk-[name].[chunkhash].js',
  };
  return config && alias(configPaths('./tsconfig.paths.json'))(config);
};
