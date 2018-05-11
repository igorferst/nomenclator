json.extract! record, :id, :name, :keywords, :notes, :created_at, :updated_at
json.url record_url(record, format: :json)
