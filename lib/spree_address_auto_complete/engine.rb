module SpreeAddressAutoComplete
  class Engine < Rails::Engine
    require 'spree/core'
    isolate_namespace Spree
    engine_name 'spree_address_auto_complete'

    # use rspec for tests
    config.generators do |g|
      g.test_framework :rspec
    end

    config.assets.precompile += %w( spree/backend/address_auto_complete.js spree/frontend/address_auto_complete.js )

    def self.activate
      Dir.glob(File.join(File.dirname(__FILE__), '../../app/**/*_decorator*.rb')) do |c|
        Rails.configuration.cache_classes ? require(c) : load(c)
      end
    end

    config.to_prepare &method(:activate).to_proc
  end
end
