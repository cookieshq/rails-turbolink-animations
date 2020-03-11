# README

[app_name]

[app description]

## Getting started

### Requirements

- Ruby 2.5.1
- yarn
- bundle

### Install all the gems

    $ bundle install

### Database setup

Run

    $ cp config/database.yml.example config/database.yml

Edit `config/database.yml` and update the database name for the development and test entry

Then setup your database

    $ rake db:setup

### Webpacker

Install the required packages

    $ yarn install

If you are using Tmuxinator, webpacker server will be started as part of your instance.
If you want to start the webpack server on your own, please run

    $ ./bin/webpack-dev-server

### Running the app

Install the heroku CLI tools [link](https://devcenter.heroku.com/articles/heroku-cli)

Then run

    $ heroku local

### Setup tmuxinator

Edit `config/tmuxinator.yml` and change the app name

Then run

    $ ln -s config/tmuxinator.yml ~/.tmuxinator/[app_name].yml

You should now be able to launch the project with

    $ tmuxinator app_name

### Heroku variables

You will need to create a few variables on your Heroku app instance.

- `APPLICATION_HOST` to receive something like `www.appdomain.com`
- `ASSET_HOST` to either receive something like `www.appdomain.com` or will use APPLICATION_HOST if not present
- `MAX_THREADS` default to 2
- `RAILS_SERVE_STATIC_FILES` default to `enabled`
- `WEB_CONCURRENCY` default to 2
- `BUGSNAG_API_KEY` to receive your Bugsnag's project API KEY
- `SKYLIGHT_AUTHENTICATION` to receive your Skylight authentication ID
- `SECRET_KEY_BASE` to generate with `rake secret`

### Heroku setup

Rails `assets:precompile` requires the dev dependencies to be installed for compiling the assets. By default, Heroku doesn't pull them and you need to set those two environment variables for that:

    $ heroku config:set NPM_CONFIG_PRODUCTION=false YARN_PRODUCTION=false

If using Skylight, you will need to activate the dyno metadata feature

    $ heroku labs:enable runtime-dyno-metadata -a <app name>

You will need to add the following buildpacks:

- heroku/nodejs
- heroku/ruby

## Front-end linting

Linting helps ensure consistent code style and catch possible issues early. It is set up for both JavaScript and SCSS files.

### JavaScript linting

JS linting is done through `ESLint` with the help of `prettier` for consistent code formatting. Configuration is in `.eslintrc.js`, with `.eslintignore` to ignore specific files. A script is setup in the `package.json` to lint all JS files in the `app/webpack` folder:

    $ yarn lint:js

### SCSS linting

SCSS linting, it is `Stylelint` that does the work. Configuration is in `.stylelintrc.js`, with `.stylelintignore` to ignore specific files. As for JS, a script is setup in `package.json` to lint all SCSS files in the `app/webpack` folder.

    $ yarn lint:css

### Linting on commit

Installing the front-end dependencies through `yarn install` also sets up commit hooks that will lint the JS and SCSS files you commit. They'll try to autocorrect errors by default (so you don't have to worry about formatting issues for ex.). If there are manual fixes to apply, please fix and re-commit. If really you need to commit without caring about those linting issues ( :( )), you can use the `--no-verify` flag at the end of your commit, which will let the commit go through without linting.
