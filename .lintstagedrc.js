module.exports = {
  "(app/webpack|app/javascript)/**/*.js": [
    "eslint --fix",
    "git add"
  ],
  "app/webpack/**/*.scss": [
    "stylelint --fix",
    "git add"
  ]
}