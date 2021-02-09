const path = require('path');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false
      }
     },
    "@storybook/preset-scss"
  ],
  webpackFinal: async (config, { configType }) => {

    // Use Sass loader for vuetify components
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '../src'),
          vue: 'vue/dist/vue.js',
          'vue$': 'vue/dist/vue.esm.js',
        },
      },
    });

    // Return the altered config
    return config;
  },

}

