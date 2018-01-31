# encoding: UTF-8
Gem::Specification.new do |s|
  s.platform    = Gem::Platform::RUBY
  s.name        = 'spree_address_auto_complete'
  s.version     = '3.3.0'
  s.summary     = 'This is to use google places api to complete addresses in spree.'
  s.description = 'Using this extension, we can integrate google places to complete the billing and shipping address of any user.'
  s.required_ruby_version = '>= 2.2.7'

  s.author    = 'Gaurav Mahajan'
  s.email     = 'info@vinsol.com'
  s.homepage  = 'http://vinsol.com'
  s.license = 'BSD-3'

  s.files       = `git ls-files`.split("\n")
  s.test_files  = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.require_path = 'lib'
  s.requirements << 'none'

  s.add_dependency 'spree', '>= 3.2.0', '< 4.0'

  s.add_development_dependency 'appraisal'
  s.add_development_dependency 'capybara', '~> 2.6'
  s.add_development_dependency 'coffee-rails'
  s.add_development_dependency 'database_cleaner'
  s.add_development_dependency 'factory_girl', '~> 4.5'
  s.add_development_dependency 'ffaker'
  s.add_development_dependency 'rspec-rails', '~> 3.4'
  s.add_development_dependency 'sass-rails', '~> 5.0.0'
  s.add_development_dependency 'selenium-webdriver'
  s.add_development_dependency 'simplecov'
  s.add_development_dependency 'sqlite3'
  s.add_development_dependency 'rails-controller-testing'
end
