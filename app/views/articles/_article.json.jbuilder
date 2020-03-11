json.extract! article, :id, :name, :content, :created_at, :updated_at
json.url article_url(article, format: :json)
