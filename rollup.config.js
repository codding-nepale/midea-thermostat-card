import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/midea-thermostat-card.js',
  output: {
    file: 'dist/midea-thermostat-card.js',
    format: 'es',
    inlineDynamicImports: true,
    sourcemap: false,
  },
  plugins: [resolve(), json(), terser()],
};
