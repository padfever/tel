const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    client: path.resolve(__dirname, 'src/client.ts'),
    index: path.resolve(__dirname, 'src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};
