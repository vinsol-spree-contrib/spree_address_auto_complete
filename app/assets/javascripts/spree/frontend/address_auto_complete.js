AddressAutoComplete = function(searchInputID, addressType) {
  this.searchInput = document.getElementById(searchInputID);
  this.formComponents = {
    postal_code: $('#order_' + addressType + '_address_attributes_zipcode'),
    country: $('#order_' + addressType + '_address_attributes_country_id'),
    state: $('#order_' + addressType + '_address_attributes_state_id'),
    city: $('#order_' + addressType + '_address_attributes_city'),
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
  var addressComponents = place.address_components.reverse();
  for(address_component_index in addressComponents) {
    var addressType = addressComponents[address_component_index].types[0]
    var addressLongName = addressComponents[address_component_index]['long_name']
    var addressShortName = addressComponents[address_component_index]['short_name']

    if(addressType == 'postal_code') {
      this.formComponents['postal_code'].val(addressLongName)
    } else if(addressType == 'country') {
      this.setCountry(addressShortName)
    } else if(addressType == 'administrative_area_level_1') {
      this.setState(addressLongName)
    } else if(addressType == 'administrative_area_level_2') {
      this.setCity(addressLongName)
    } else if(address_component_index > (addressComponents.length - 3)) {
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
  var optionId = $(this.searchInput).data('countryMapping')[countryISO];
  this.formComponents.country.val(optionId).change();
}

AddressAutoComplete.prototype.setState = function(stateName) {
  var _this = this;
  $.ajax({
    url: '/api/states/' + stateName + '/state_id',
    dataType: 'json',
    success: function(data) {
      _this.formComponents.state.val(data['state_id']).change();
    }
  })
}

AddressAutoComplete.prototype.setCity = function(cityName) {
  this.formComponents.city.val(cityName);
}

AddressAutoComplete.prototype.setAddress = function(addressNumber, addressLongName) {
  if(this.formComponents['address' + addressNumber].val() == '') {
    this.formComponents['address' + addressNumber].val(addressLongName)
  } else {
    this.formComponents['address' + addressNumber].val(addressLongName + ', ' + this.formComponents['address' + addressNumber].val())
  }
}

$(function() {
  billingAddressAutoComplete = new AddressAutoComplete('billing_search', 'bill')
  billingAddressAutoComplete.init();
  shippingAddressAutoComplete = new AddressAutoComplete('shipping_search', 'ship')
  shippingAddressAutoComplete.init();
});