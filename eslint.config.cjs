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
  ...legacyConfig
} = eslintConfig;

delete legacyConfig.root;

const disableProtractorRecommendedRules = Object.fromEntries(
  Object.keys(protractorPlugin.configs.recommended.rules).filter(r => r !== 'protractor/use-count-method' && r !== 'protractor/no-shadowing').map(ruleName => [ruleName, 'off'])
);

/**
 *
 * @param text
 * @param searchValue
 */
function countOccurrences(text, searchValue) {
  return text.split(searchValue).length - 1;
}

/**
 *
 * @param text
 */
function rewriteQooxdooConstructSuperCalls(text) {
  const lines = text.split('\n');
  let inConstruct = false;
  let constructBraceDepth = 0;

  return lines.map(line => {
    if (!inConstruct) {
      if (/^\s*construct\s*\(/.test(line)) {
        inConstruct = true;
        constructBraceDepth = countOccurrences(line, '{') - countOccurrences(line, '}');
      }
      return line;
    }

    const rewrittenLine = constructBraceDepth === 1 ? line.replace(/\bsuper\s*\(/g, 'super.constructor(') : line;
    constructBraceDepth += countOccurrences(line, '{') - countOccurrences(line, '}');

    if (constructBraceDepth <= 0) {
      inConstruct = false;
      constructBraceDepth = 0;
    }

    return rewrittenLine;
  }).join('\n');
}

const qooxdooCompatPlugin = {
  processors: {
    construct: {
      preprocess(text) {
        if (!text.includes('qx.Class.define') || !text.includes('construct(')) {
          return [text];
        }

        return [rewriteQooxdooConstructSuperCalls(text)];
      },
      postprocess(messages) {
        return messages.flat();
      },
      supportsAutofix: true
    }
  }
};

/**
 *
 * @param rules
 */
function filterOutProtractorRules(rules = {}) {
  return Object.fromEntries(Object.entries(rules).filter(([ruleName]) => !ruleName.startsWith('protractor/')));
}

/**
 *
 * @param override
 */
function sanitizeLegacyOverride(override) {
  return {
    ...override,
    rules: filterOutProtractorRules(override.rules)
  };
}

/**
 *
 * @param config
 */
function sanitizeLegacyConfig(config) {
  return {
    ...config,
    extends: (config.extends || []).filter(
      configName => configName !== '@qooxdoo/qx/browser' && configName !== 'plugin:protractor/recommended'
    ),
    plugins: (config.plugins || []).filter(pluginName => pluginName !== 'protractor'),
    rules: filterOutProtractorRules(config.rules),
    overrides: (config.overrides || []).map(sanitizeLegacyOverride)
  };
}

module.exports = [
  {
    files: ['source/class/**/*.js', 'client/source/class/**/*.js'],
    plugins: {
      local: qooxdooCompatPlugin
    },
    processor: 'local/construct'
  },
  {
    files: ['eslint.config.cjs', 'Gruntfile.js', 'compile.js', 'utils/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node
    }
  },
  {
    files: ['.github/actions/github/index.js'],
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      sourceType: 'module',
      globals: globals.node,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          parserOpts: {
            plugins: ['importAssertions']
          }
        }
      }
    }
  },
  {
    files: ['skeletons/widget-test.js'],
    languageOptions: {
      globals: globals.jasmine
    }
  },
  ...qxBrowserConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        com: 'readonly',
        qxl: 'readonly'
      }
    }
  },
  ...compat.config(sanitizeLegacyConfig({
    ...legacyConfig,
    extends: legacyExtends
  })),
  {
    files: ['eslint.config.cjs', 'Gruntfile.js', 'compile.js', 'utils/**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly'
      }
    }
  },
  {
    files: ['.github/actions/github/index.js'],
    languageOptions: {
      parser: require('@babel/eslint-parser'),
      sourceType: 'module',
      globals: globals.node,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          parserOpts: {
            plugins: ['importAssertions']
          }
        }
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['skeletons/widget-test.js'],
    languageOptions: {
      globals: globals.jasmine
    }
  },
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
