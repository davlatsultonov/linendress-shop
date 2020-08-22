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
            purgecss({
              content: ['./**/*.html'],
              keyframes: true,
                whitelist: ['show-counter', 'disabled'],
              defaultExtractor: (content) => content.match(/[A-z0-9-:/]+/g)
            })
          ]
        : [])
    ]
  };
};
