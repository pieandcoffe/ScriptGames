require "json"

module Storage
  def self.path_for_html(page_name)
    "storage/html/#{page_name}.html"
  end

  def self.path_for_json(page_name)
    "storage/json/#{page_name}.json"
  end

  def self.store_html(page_name, html)
    File.write(path_for_html(page_name), html)
  end

  def self.exist_html?(page_name)
    File.exist?(path_for_html(page_name))
  end

  def self.read_html(page_name)
    File.read(path_for_html(page_name))
  end

  def self.store_json(page_name, parsed)
    File.write(path_for_json(page_name), JSON.pretty_generate(parsed))
  end

  def self.exist_json?(page_name)
    File.exist?(path_for_json(page_name))
  end

  def self.read_json(page_name)
    File.read(path_for_json(page_name))
  end
end
