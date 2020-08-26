const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');

module.exports = (ctx) => {
  return {
    plugins: [
      require('autoprefixer'),
      ...(ctx.options.env === 'production'
        ? [
            cssnano({
              preset: 'default'
            }),
            /*purgecss({
              content: ['./!**!/!*.html'],
                css: ['./src/styles/utils/'],
              keyframes: true,
                whitelist: ['show-counter', 'disabled'],
            })*/
          ]
        : [])
    ]
  };
};
