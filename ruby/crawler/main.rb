require_relative "src/crawler"
require_relative "src/storage"

page = "laptop1"

unless Storage.exist_html?(page)
  html = Crawler.fetch
  Storage.store_html(page, html)
end

puts Storage.read_html(page)
