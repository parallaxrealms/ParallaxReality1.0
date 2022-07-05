module.exports = {
  plugins: [
    require('postcss-nested'),
    require('postcss-mixins'),
    require('autoprefixer'),
    require('stylelint'),
    require('postcss-reporter'),
    require('cssnano')
  ],
};