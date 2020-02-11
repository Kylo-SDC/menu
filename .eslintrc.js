/**
 * These rules enforce the Hack Reactor Style Guide
 *
 * Visit this repo for more information:
 *   https://github.com/reactorcore/eslint-config-hackreactor
 */

module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "node": true
  },
  "extends": "airbnb",
  "ignorePatterns": ["bundle.js", "node_modules/", "*.test.js", "public/"],
  "rules": {
    "no-console": "off",
  }
}