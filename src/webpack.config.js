const path = require("path");

const config = {
  entry: "/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  } ,
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
    ]
  }
};

module.exports = config;
