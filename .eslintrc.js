module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:promise/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "prettier",
    "import",
    "promise"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true,
    "jquery": true
  },
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module",
  },
  "rules": {
    // This will be handled by production compression
    "no-console": 0,
  }, "overrides": [
    {
      "files": ["**/__tests__/**/*.js"],
      "env": { "jest": true }
    }
  ]
}
