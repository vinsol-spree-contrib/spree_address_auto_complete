module Spree
  module Api
    StatesController.class_eval do
      def state_id
        if state = Spree::State.where("lower(name) = ?", params[:name].downcase).first
          render json: { state_id: state.id }
        else
          head :ok
        end
      end
    end
  end
end
