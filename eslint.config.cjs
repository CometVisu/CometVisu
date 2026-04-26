'use strict';

const { FlatCompat } = require('@eslint/eslintrc');
const globals = require('globals');
const qxBrowserConfig = require('@qooxdoo/eslint-config-qx/browser');
const protractorPlugin = require('eslint-plugin-protractor');
const { eslintConfig } = require('./package.json');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname
});

const {
  extends: legacyExtends = [],
  root: _root,
  ...legacyConfig
} = eslintConfig;

const disableProtractorRecommendedRules = Object.fromEntries(
  Object.keys(protractorPlugin.configs.recommended.rules).map(ruleName => [ruleName, 'off'])
);

module.exports = [
  ...qxBrowserConfig,
  {
    languageOptions: {
      globals: globals.browser
    }
  },
  ...compat.config({
    ...legacyConfig,
    extends: legacyExtends.filter(configName => configName !== '@qooxdoo/qx/browser')
  }),
  {
    files: ['**/*.js'],
    ignores: [
      'source/test/protractor/**/*.js',
      'source/test/protractor/*.js',
      'utils/screenshots-spec.js',
      'utils/compile/**/*.js'
    ],
    rules: disableProtractorRecommendedRules
  }
];
