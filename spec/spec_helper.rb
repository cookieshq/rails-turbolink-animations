require "webmock/rspec"


RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.syntax = :expect
  end

  config.mock_with :rspec do |mocks|
    mocks.syntax = :expect
    mocks.verify_partial_doubles = true
  end

  config.example_status_persistence_file_path = "tmp/rspec_examples.txt"
  config.order = :random


  config.shared_context_metadata_behavior = :apply_to_host_groups
end

WebMock.disable_net_connect!(allow_localhost: true)

