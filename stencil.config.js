const sass = require('@stencil/sass')

exports.config = {
  plugins: [sass()],
  outputTargets: [
    {
      type: 'www',
      // serviceWorker: false,
    }
  ],
}

exports.devServer = {
  root: 'www',
  watchGlob: '**/**',
}
