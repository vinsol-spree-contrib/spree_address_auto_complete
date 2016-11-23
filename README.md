# SpreeAddressAutoComplete

SpreeAddressAutoComplete allows you to use suggested address functionality using google maps api. Once installed the user will be given with a field in the address step of checkout page, using which he can select one of the suggested addresses by google, instead of typing the whole address by himself.

## Installation

1. Add this extension to your Gemfile with this line:
  ```ruby
  gem 'spree_address_auto_complete', git: 'https://github.com/vinsol/spree_address_auto_complete', branch: '3-0-stable'
  ```

2. Install the gem using Bundler:
  ```ruby
  bundle install
  ```

3. Copy & run migrations
  ```ruby
  bundle exec rails g spree_address_auto_complete:install
  ```

4. Go to general_setting in admin section to add your google maps api key.

5. Restart your server

  If your server was running, restart it so that it can find the assets properly.

## Testing

Be sure to bundle your dependencies and then create a dummy test app for the specs to run against.

```shell
bundle
bundle exec rake test_app
bundle exec rspec spec
```

<<<<<<< HEAD
When testing your applications integration with this extension you may use it's factories.
Simply add this require statement to your spec_helper:

```ruby
require 'spree_address_auto_complete/factories'
```


Credits
-------

[![vinsol.com: Ruby on Rails, iOS and Android developers](http://vinsol.com/vin_logo.png "Ruby on Rails, iOS and Android developers")](http://vinsol.com)

Copyright (c) 2016 [vinsol.com](http://vinsol.com "Ruby on Rails, iOS and Android developers"), released under the New MIT License
