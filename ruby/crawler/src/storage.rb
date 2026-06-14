module Storage
  def self.getPath(page_name)
    "source/#{page_name}.html)"
  end

  def self.storeHtml(page_name, html)
    File.write(getPath(page_name), html)
  end

  def self.readHtml(page_name)
    File.read(getPath)
  end
end
