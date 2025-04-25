const path = require('path');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

module.exports = {
  mode: 'production',
  entry: './src/ckeditor.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ckeditor.js',
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      // بارگذاری فایل‌های SVG
      {
        test: /\.svg$/,
        use: ['url-loader'],  // یا file-loader به جای url-loader برای بارگذاری تصاویر
      },
      // بارگذاری فایل‌های CSS
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          {
            loader: 'css-loader',  // برای پردازش فایل‌های CSS
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer'),
                  require('cssnano')({
                    preset: 'default',
                  }),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
};
