json.tweets do
  json.array! @tweets do |tweet|
    json.id tweet.id
    json.username tweet.user.username
    json.message tweet.message
    json.created_at tweet.created_at
    json.updated_at tweet.updated_at
  end
end
