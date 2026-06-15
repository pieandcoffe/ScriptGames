require "faraday"
require "cgi"

require_relative '../config'
require_relative 'storage'

module Crawler
  def self.fetch(keyword = "laptop")
    encoded_keyword = CGI.escape(keyword)
    url = "#{Config::URL}?string=#{encoded_keyword}"

    api_url = "https://api.zenrows.com/v1/?" \
              "apikey=#{Config::ZENROWS_API_KEY}&" \
              "url=#{CGI.escape(url)}&js_render=true&premium_proxy=true"

    response = Faraday.get(api_url)

    raise "Crawler error: #{response.status} #{response.body}" unless response.success?

    puts "Fetched from: #{url}"

    response.body
  end
end