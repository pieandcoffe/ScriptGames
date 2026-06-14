require "faraday"
require "cgi"

require_relative '../config'

module Crawler
  def self.fetch(url = Config::URL)
    encoded = CGI.escape(url)

    url = "https://api.zenrows.com/v1/?apikey=#{Config::ZENROWS_API_KEY}&url=#{encoded}&js_render=true&premium_proxy=true"

    res = Faraday.get(url)
    html = res.body

    return html
  end
end