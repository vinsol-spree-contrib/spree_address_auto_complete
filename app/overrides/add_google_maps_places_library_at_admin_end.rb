Deface::Override.new(
  virtual_path: 'spree/admin/users/_addresses_form',
  name: 'add_google_maps_places_library_at_admin_end',
  insert_before: "[data-hook='bill_address_wrapper']",
  partial: 'spree/shared/add_google_maps_places_library'
)

Deface::Override.new(
  virtual_path: 'spree/admin/orders/customer_details/_form',
  name: 'add_google_maps_places_library_at_admin_end',
  insert_before: "[data-hook='bill_address_wrapper']",
  partial: 'spree/shared/add_google_maps_places_library'
)
