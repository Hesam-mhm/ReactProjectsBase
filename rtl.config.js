import path from 'path';
import { deleteAsync } from 'del'; // `del`'s ES module version
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import RtlCssPlugin from 'rtlcss-webpack-plugin';

// global variables
const rootPath = path.resolve();
const distPath = `${rootPath}/src/_metronic/assets`;
const entries = {
  'css/style': './src/_metronic/assets/sass/style.scss',
};

// remove older folders and files
await deleteAsync(`${distPath}/css`, { force: true });

export default {
  mode: 'development',
  stats: 'verbose',
  performance: {
    hints: 'error',
    maxAssetSize: 10000000,
    maxEntrypointSize: 4000000,
  },
  entry: entries,
  output: {
    // main output path in assets folder
    path: distPath,
    // output path based on the entries' filename
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.scss'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].rtl.css',
    }),
    new RtlCssPlugin({
      filename: '[name].rtl.css',
    }),
    {
      apply: (compiler) => {
        // hook name
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', async () => {
          await deleteAsync(`${distPath}/css/*.js`, { force: true });
        });
      },
    },
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
