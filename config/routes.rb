Rails.application.routes.draw do
  root 'pages#home'
    
  # USERS
  post '/users'                  => 'users#create'
  get '/users'                   => 'users#list'

  # SESSIONS
  post '/sessions'               => 'sessions#create'
  get  '/authenticated'          => 'sessions#authenticated'
  delete '/sessions'             => 'sessions#destroy'

  # TWEETS
  post '/tweets'                 => 'tweets#create'
  get  '/tweets'                 => 'tweets#index'
  delete '/tweets/:id'           => 'tweets#destroy'
  get '/users/:username/tweets'  => 'tweets#index_by_user'

  # Redirect all other paths to index page, which will be taken over by AngularJS
  get '*path'    => 'pages#home'
end
