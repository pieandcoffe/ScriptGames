require "faraday"
require "cgi"

require_relative '../config'
require_relative 'storage'

module Crawler
  def self.fetch(url = Config::URL)
    encoded = CGI.escape(url)

    api_url = "https://api.zenrows.com/v1/?" \
              "apikey=#{Config::ZENROWS_API_KEY}&" \
              "url=#{encoded}&js_render=true&premium_proxy=true"

    response = Faraday.get(api_url)

    unless response.success?
      raise "Crawler error: #{response.status} #{response.body}"
    end

    puts "Fetched from: #{url}"

    response.body
  end
end