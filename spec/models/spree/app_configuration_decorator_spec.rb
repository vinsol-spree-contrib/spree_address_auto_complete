require "spec_helper"

describe Spree::AppConfiguration do

  it "should set preference google_maps_api_key"  do
    expect(Spree::Config.google_maps_api_key).to eq(nil)
  end

end
