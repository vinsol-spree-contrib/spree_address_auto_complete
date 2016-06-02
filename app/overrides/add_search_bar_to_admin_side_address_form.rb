Deface::Override.new(
  virtual_path: 'spree/admin/shared/_address_form',
  name: 'add_search_bar_to_admin_side_address_form',
  insert_top: "[data-hook='address_fields']",
  partial: 'spree/admin/shared/add_search_bar'
)
