require_relative "src/crawler"
require_relative "src/storage"
require_relative "src/parser"

page = "laptop1"

unless Storage.exist_html?(page)
  html = Crawler.fetch
  Storage.store_html(page, html)
end

unless Storage.exist_json?(page)
  listing = Storage.read_html(page)
  json = Parser::parse_listing(listing)

  Storage::store_json(page, json)
end

puts Storage::read_json(page)