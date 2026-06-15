require_relative "src/crawler"
require_relative "src/storage"
require_relative "src/parser"
require_relative "config"

puts "Allegro listing, enter keyword to crawl [#{Config::URL}?string={keyword}]:"
keyword = gets.strip

unless Storage.exist_html?(keyword)
  html = Crawler.fetch(keyword)
  Storage.store_html(keyword, html)
end

puts Storage::read_html(keyword)

puts "HTML page is fetched by #{keyword} keyword, press enter to continue"
gets

unless Storage.exist_json?(keyword)
  listing = Storage.read_html(keyword)
  json = Parser::parse_listing(listing)

  Storage::store_json(keyword, json)
end

puts Storage::read_json(keyword)