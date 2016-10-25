require 'spec_helper'

describe Spree::Api::V1::StatesController, type: :controller do

  let(:state) { create(:state) }

  describe "GET 'state_id'" do

    before do
      @state = state
      send_request
    end

    context 'When the state does not matches' do

      def send_request
        get :state_id, { name: 'XXXXX' }
      end

      it "recieves status to be 200" do
        expect(response.status).to eq 200
      end
    end

    context 'When the state matches' do

      def send_request
        get :state_id, { name: state.name }
      end

      it "recieves status to be 200" do
        expect(response.status).to eq 200
      end

      it "expects to return state id" do
        json_response = ActiveSupport::JSON.decode(response.body)
        expect(json_response['state_id']).to eq @state.id
      end
    end

  end

end
