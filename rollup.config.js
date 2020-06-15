import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

import pkg from './package.json';

// Rollup
const input = 'src/index.js';
const external = ['react', 'react-dom', 'prop-types', '@transferwise/components'];

// Babel
const babelrc = false;
const plugins = [];
const presets = [];
const exclude = 'node_modules/**';

const DEFAULT_BABEL_CONFIG = { babelrc, presets, plugins, exclude };

export default [
  {
    input,
    output: {
      file: pkg.main,
      format: 'umd',
      name: 'formatting',
    },
    external,
    plugins: [
      resolve({
        browser: true,
      }),
      babel(DEFAULT_BABEL_CONFIG),
      json(),
      commonjs(),
    ],
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
    },
    external,
    plugins: [
      resolve({
        browser: true,
      }),
      babel(DEFAULT_BABEL_CONFIG),
      json(),
    ],
  },
];
