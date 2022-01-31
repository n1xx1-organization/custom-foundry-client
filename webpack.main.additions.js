module.exports = {
  module: {
    rules: [
      {
        test: /\.raw.js$/,
        use: "raw-loader",
      },
    ],
  },
};
