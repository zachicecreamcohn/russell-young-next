require('dotenv').config();

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Add file-loader for fonts
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/fonts/[name].[hash].[ext]',
          },
        },
      });
    }

    // Add fallback for node-fetch
    config.resolve.fallback = {
      "node:": require.resolve("node-fetch"),
    };

    return config;
  },
};
