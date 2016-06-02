Deface::Override.new(
  virtual_path: 'spree/address/_form',
  name: 'add_search_bar_to_address_form',
  insert_top: ".inner",
  partial: 'spree/address/add_search_bar'
)
