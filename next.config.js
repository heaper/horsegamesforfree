module.exports = {
    webpack: (config, {isServer}) => {
        config.module.rules.push({
            test: /\.mp3$/,
            type: 'asset/resource',
            generator: {
              filename: `${isServer ? '../' : ''}static/[name]-[hash].[ext]`
            }
        });
  
        return config;
    }
}