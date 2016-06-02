AddressAutoComplete = function(searchInputID, addressType) {
  this.searchInput = document.getElementById(searchInputID);
  this.formComponents = {
    postal_code: $('#order_' + addressType + '_address_attributes_zipcode'),
    country: $('#order_' + addressType + '_address_attributes_country_id'),
    address1: $('#order_' + addressType + '_address_attributes_address1'),
    address2: $('#order_' + addressType + '_address_attributes_address2')
  };
}

AddressAutoComplete.prototype.init = function() {
  var _this = this
  this.autocomplete = new google.maps.places.Autocomplete(this.searchInput, {});
  this.autocomplete.addListener('place_changed', function() {
    _this.fillInAddress(this)
  });
}

AddressAutoComplete.prototype.fillInAddress = function(autocomplete) {
  this.clearFormComponents();
  var place = autocomplete.getPlace();
  for(address_component_index in place.address_components) {
    var addressType = place.address_components[address_component_index].types[0]
    var addressLongName = place.address_components[address_component_index]['long_name']
    var addressShortName = place.address_components[address_component_index]['short_name']

    if(addressType == 'postal_code') {
      this.formComponents['postal_code'].val(addressLongName)
    } else if(addressType == 'country') {
      this.setCountry(addressShortName)
    } else if(address_component_index < 2) {
      this.setAddress(1, addressLongName)
    } else {
      this.setAddress(2, addressLongName)
    }
  }
};

AddressAutoComplete.prototype.clearFormComponents = function() {
  for(form_component in this.formComponents) {
    this.formComponents[form_component].val('');
  }
}

AddressAutoComplete.prototype.setCountry = function(countryISO) {
  var OptionId = $(this.searchInput).data('countryMapping')[countryISO];
  this.formComponents.country.val(OptionId);
}

AddressAutoComplete.prototype.setAddress = function(addressNumber, addressLongName) {
  if(this.formComponents['address' + addressNumber].val() == '') {
    this.formComponents['address' + addressNumber].val(addressLongName)
  } else {
    this.formComponents['address' + addressNumber].val(this.formComponents['address' + addressNumber].val() + ', ' + addressLongName)
  }
}

$(function() {
  billingAddressAutoComplete = new AddressAutoComplete('billing_search', 'bill')
  billingAddressAutoComplete.init();
  shippingAddressAutoComplete = new AddressAutoComplete('shipping_search', 'ship')
  shippingAddressAutoComplete.init();
});