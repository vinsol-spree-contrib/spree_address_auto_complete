# SpreeAddressAutoComplete

SpreeAddressAutoComplete allows you to use suggested address functionality using google maps api. Once installed the user will be given with a field in the address step of checkout page, using which he can select one of the suggested addresses by google, instead of typing the whole address by himself.

## Installation

1. Add this extension to your Gemfile with this line:
  ```ruby
  gem 'spree_address_auto_complete', git: 'https://github.com/vinsol/spree_address_auto_complete', branch: '3-1-stable'
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

## Contributing

If you'd like to contribute, please take a look at the
[instructions](CONTRIBUTING.md) for installing dependencies and crafting a good
pull request.

Copyright (c) 2016 [name of extension creator], released under the New BSD License

