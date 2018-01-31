module Spree
  module AddressSearchHelper
    def add_search_bar(address_type)
      country_mapping = available_countries.map { |country| [country.iso, country.id] }.to_h
      label = label_tag "#{address_type}_search", Spree.t(:search)
      text_field = text_field_tag :search, '', class: 'form-control address-search-bar', id: "#{address_type}_search", placeholder: Spree.t(:google_maps_placeholder), data: { country_mapping: country_mapping }
      content_tag('p', (label + text_field).html_safe, class: 'form-group')
    end

    def add_google_maps_places_library(key)
      javascript_include_tag("https://maps.googleapis.com/maps/api/js?key=#{ key }&libraries=places")
    end
  end
end
