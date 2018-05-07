AddressAutoComplete = function(searchInputID, addressType) {
  this.searchInput = document.getElementById(searchInputID);
  this.addressRegion = addressType.substring(0,1);
  this.formComponents = {
    postal_code: $("[id$='" + addressType + "_address_attributes_zipcode']"),
    country: $("[id$='" + addressType + "_address_attributes_country_id']"),
    state: $("[id$='" + addressType + "_address_attributes_state_id']"),
    city: $("[id$='" + addressType + "_address_attributes_city']"),
    address1: $("[id$='" + addressType + "_address_attributes_address1']"),
    address2: $("[id$='" + addressType + "_address_attributes_address2']")
  };
}

AddressAutoComplete.prototype.init = function() {
  var _this = this;
  this.autocomplete = new google.maps.places.Autocomplete(this.searchInput, {});
  this.autocomplete.addListener('place_changed', function() {
    _this.fillInAddress(this);
  });
}

AddressAutoComplete.prototype.fillInAddress = function(autocomplete) {
  this.clearFormComponents();
  var place = autocomplete.getPlace();
  var addressComponents = place.address_components.reverse();
  var addressOneComponentsLength = 0
  for(address_component_index in addressComponents) {
    var addressType = addressComponents[address_component_index].types[0];
    var addressLongName = addressComponents[address_component_index]['long_name'];
    var addressShortName = addressComponents[address_component_index]['short_name'];

    if(addressType == 'postal_code') {
      this.formComponents['postal_code'].val(addressLongName);
    } else if(addressType == 'country') {
      this.setCountry(addressShortName);
    } else if(addressType == 'administrative_area_level_1') {
      this.setState(addressLongName);
    } else if(addressType == 'locality') {
      this.setCity(addressLongName);
    } else if(addressOneComponentsLength < 2) {
      this.setAddress(1, addressLongName);
      addressOneComponentsLength++
    } else {
      this.setAddress(2, addressLongName);
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

AddressAutoComplete.prototype.setState =function(stateName) {
  var _this = this;
  var country = $('span#' + this.addressRegion + 'country .select2').select2('val');
  var state_select = $('span#' + this.addressRegion + 'state select.select2');
  var state_input = $('span#' + this.addressRegion + 'state input.state_name');
  $.get(Spree.routes.states_search + '?country_id=' + country, function (data) {
    var states = data.states;
    if (states.length > 0) {
      state_select.html('');
      var states_with_blank = [{
        name: '',
        id: ''
      }].concat(states);
      $.each(states_with_blank, function (pos, state) {
        var opt = $(document.createElement('option'))
          .prop('value', state.id)
          .html(state.name);
        state_select.append(opt);
      });
      state_select.prop('disabled', false).show();
      state_select.select2();
      state_input.hide().prop('disabled', true);
    } else {
      state_input.prop('disabled', false).show();
      state_select.select2('destroy').hide();
    }
  })
    .done(function(){
      _this.updateState(stateName);
  });
}

AddressAutoComplete.prototype.updateState = function(stateName) {
  var stateId = this.formComponents.state.find('option').filter(function () {
    return $(this).html().toLowerCase() == stateName.toLowerCase();
  }).val();

  this.formComponents.state.val(stateId).change();
}

AddressAutoComplete.prototype.setCity = function(cityName) {
  this.formComponents.city.val(cityName);
}

AddressAutoComplete.prototype.setAddress = function(addressNumber, addressLongName) {
  if(this.formComponents['address' + addressNumber].val() == '') {
    this.formComponents['address' + addressNumber].val(addressLongName);
  } else {
    this.formComponents['address' + addressNumber].val(addressLongName + ', ' + this.formComponents['address' + addressNumber].val());
  }
}

$(function() {
  billingAddressAutoComplete = new AddressAutoComplete('billing_search', 'bill');
  billingAddressAutoComplete.init();
  shippingAddressAutoComplete = new AddressAutoComplete('shipping_search', 'ship');
  shippingAddressAutoComplete.init();
});
