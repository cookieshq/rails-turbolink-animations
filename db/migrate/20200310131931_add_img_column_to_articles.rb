class AddImgColumnToArticles < ActiveRecord::Migration[6.0]
  def change
    add_column :articles, :img_url, :string
  end
end
