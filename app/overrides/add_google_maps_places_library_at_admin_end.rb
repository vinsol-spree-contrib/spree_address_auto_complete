Deface::Override.new(
  virtual_path: 'spree/admin/shared/_address_form',
  name: 'add_google_maps_places_library_at_admin_end',
  insert_after: "[data-hook='address_fields']",
  partial: 'spree/shared/add_google_maps_places_library'
)
