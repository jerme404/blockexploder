// Get app version from package.
process.env.VUE_APP_VERSION = require('./package.json').version;

// vue.config.js
module.exports = {

    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }));
    },

    publicPath: process.env.VUE_PUBLIC_PATH,
};
