import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
// import nodePolyfills from 'rollup-plugin-node-polyfills'

export const config: Config = {
  plugins: [
    sass(),
    // nodePolyfills()
  ],
  outputTargets: [
    {
      type: 'www',
      serviceWorker: false,
    }
  ],
  // nodeResolve: {
  //   browser: true,
  // }
}
