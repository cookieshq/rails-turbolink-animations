require 'rails_helper'

RSpec.describe HomepageController, type: :controller do

  describe "index" do
    it "should reply with 200" do
      get :index
      expect(response.status).to eql(200)
    end
  end

end
