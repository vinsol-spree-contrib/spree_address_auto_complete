Deface::Override.new(
  virtual_path: 'spree/checkout/_address',
  name: 'add_google_maps_places_library',
  insert_after: "[data-hook='billing_fieldset_wrapper']",
  partial: 'spree/shared/add_google_maps_places_library'
)
