module.exports = {
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-bootstrap/scss",
    "stylelint-prettier/recommended"
  ],
  rules: {
    "selector-max-universal": 2,
    "property-blacklist": [],
    "selector-class-pattern": null,
    "scss/dollar-variable-default": null,
    "selector-no-qualifying-type": [true, { "severity": "warning" }],
    "declaration-no-important": [true, { "severity": "warning" }],
    "selector-max-id": [0, { "severity": "warning" }],
    "selector-max-type": [2, { "severity": "warning" }]
  }
}
