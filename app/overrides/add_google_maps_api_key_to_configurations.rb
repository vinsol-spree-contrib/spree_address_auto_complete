Deface::Override.new(virtual_path: 'spree/admin/general_settings/edit',
  name: 'add_google_maps_places_library',
  insert_before: "div.form-actions",
  text: "
    <div class='row'>
      <div class='field col-md-6'>
        <%= label_tag(Spree.t('google_maps_api_key')) %>
        <%= preference_field_tag('google_maps_api_key', Spree::Config['google_maps_api_key'], type: 'string') %>
      </div>
    </div>
  ")
