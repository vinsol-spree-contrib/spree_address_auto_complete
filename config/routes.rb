Spree::Core::Engine.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    get '/states/:name/state_id', to: 'states#state_id'
  end
end
