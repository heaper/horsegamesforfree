module.exports = {
    webpack: (config, {isServer}) => {
        config.module.rules.push({
            test: /\.mp3$/,
            use: [{
              loader: 'file-loader',
              options: {
                publicPath: '/_next/static/',
                outputPath: `${isServer ? '../' : ''}static/`,
                name: '[name]-[hash].[ext]',
                esModule: config.esModule || false,
              },
            }]
        });
  
        return config;
    }
}