require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_text/engine"
#require "action_mailbox/engine"
#require "action_cable/engine"
#require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

#TODO change app_name
module AppName
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.action_mailer.preview_path = "#{Rails.root}/spec/mailers/previews"


    config.generators do |generate|
      generate.test_framework :rspec
      generate.helper false
      generate.javascripts false
      generate.request_specs false
      generate.routing_specs false
      generate.stylesheets false
      generate.view_specs false
    end

    config.action_controller.action_on_unpermitted_parameters = :raise

    %w[services validators notifiers].each do |dir|
      config.autoload_paths += Dir[Rails.root.join('app', dir, '{**/}')]
    end


  end
end
