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
const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-transform-arrow-functions',
];
const exclude = 'node_modules/**';
const presets = [];

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
      babel({ ...DEFAULT_BABEL_CONFIG, presets: ['@babel/env'].concat(presets) }),
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
