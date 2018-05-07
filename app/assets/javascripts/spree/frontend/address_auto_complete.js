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


AddressAutoComplete.prototype.setState = function(stateName) {
  var _this = this;
  var countryId = $('#' + this.addressRegion + 'country select').val();
  if (countryId != null) {
    if (Spree.Checkout[countryId] == null) {
      return $.get(Spree.routes.states_search, {
        country_id: countryId
      }, function(data) {
        Spree.Checkout[countryId] = {
          states: data.states,
          states_required: data.states_required
        };
        return _this.fillStates(Spree.Checkout[countryId], _this.addressRegion, stateName);
      });
    } else {
      return _this.fillStates(Spree.Checkout[countryId], _this.addressRegion, stateName);
    }
  }
}

AddressAutoComplete.prototype.fillStates = function(data, region, stateName) {
  var _this = this;
  var selected, stateInput, statePara, stateSelect, stateSpanRequired, states, statesRequired, statesWithBlank;
  statesRequired = data.states_required;
  states = data.states;
  statePara = $('#' + region + 'state');
  stateSelect = statePara.find('select');
  stateInput = statePara.find('input');
  stateSpanRequired = statePara.find('[id$="state-required"]');
  if (states.length > 0) {
    selected = parseInt(stateSelect.val());
    stateSelect.html('');
    statesWithBlank = [
      {
        name: '',
        id: ''
      }
    ].concat(states);
    $.each(statesWithBlank, function(idx, state) {
      var opt;
      opt = ($(document.createElement('option'))).attr('value', state.id).html(state.name);
      if (selected === state.id) {
        opt.prop('selected', true);
      }
      return stateSelect.append(opt);
    });
    stateSelect.prop('disabled', false).show();
    stateInput.hide().prop('disabled', true);
    statePara.show();
    stateSpanRequired.show();
    if (statesRequired) {
      stateSelect.addClass('required');
    }
    _this.updateState(stateName);
    stateSelect.removeClass('hidden');
    return stateInput.removeClass('required');
  } else {
    stateSelect.hide().prop('disabled', true);
    stateInput.show();
    if (statesRequired) {
      stateSpanRequired.show();
      stateInput.addClass('required');
    } else {
      stateInput.val('');
      stateSpanRequired.hide();
      stateInput.removeClass('required');
    }
    statePara.toggle(!!statesRequired);
    stateInput.prop('disabled', !statesRequired);
    stateInput.removeClass('hidden');
    return stateSelect.removeClass('required');
  }
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
