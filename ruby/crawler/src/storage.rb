module Storage
  def self.path_for(page_name)
    "storage/#{page_name}.html"
  end

  def self.store_html(page_name, html)
    File.write(path_for(page_name), html)
  end

  def self.exist_html?(page_name)
    File.exist?(path_for(page_name))
  end

  def self.read_html(page_name)
    File.read(path_for(page_name))
  end
end
