require "nokogiri"

module Parser
  module CSS
    ARTICLES       = 'li article'
    TITLE          = 'h2 a'
    RATING         = '[role="group"] span[aria-hidden="true"]'
    PROPERTIES_DT  = 'dl dt'
    PROPERTIES_DD  = 'dl dd'
    PRICE          = 'p[aria-label*="aktualna cena"]'
  end

  def self.parse_listing(html)
    doc = Nokogiri::HTML(html)
    doc.css(CSS::ARTICLES).map { |article| parse_article(article) }.compact
  end

  def self.parse_article(article)
    title_node = article.at_css(CSS::TITLE)
    return nil unless title_node
    title = title_node.text.strip
    url   = title_node['href']

    rating_node = article.at_css(CSS::RATING)
    rating = rating_node&.text&.strip&.sub(",", ".").to_f

    properties = {}
    dts = article.css(CSS::PROPERTIES_DT)
    dds = article.css(CSS::PROPERTIES_DD)
    dts.each_with_index do |dt, i|
      properties[dt.text.strip] = dds[i]&.text&.strip
    end

    price_node = article.at_css(CSS::PRICE)
    price = price_node ? price_node['aria-label'].gsub('aktualna cena', '').strip.sub(",", ".").to_f : nil


    { title: title, url: url, rating: rating, properties: properties, price: price }
  end
end
