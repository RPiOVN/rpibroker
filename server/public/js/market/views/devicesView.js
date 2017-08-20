/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/devices.html'
], function ($, _, Backbone, DevicesTemplate) {
	'use strict';

	var DevicesView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#devicesView', 

		template: _.template(DevicesTemplate),

		// The DOM events specific to an item.
		events: {
      'click #addNewDeviceBtn': 'loadDeviceEditor',
      'click .deviceDelete': 'deleteDevice'
		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#devicesView').show();
      
      this.populateDevices();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    },
    
    //Load the device editor. This function is called when the user clicks the '+Add New Device' button.
    loadDeviceEditor: function() {
      //debugger;
      
      global.deviceEditorView.render();
    },
    
    //This function is called when the user clicks the 'Delete' button associated with a device.
    deleteDevice: function() {
      debugger;
    },
    
    //This function is called by render(). It populates the DOM by cloning the scaffold and populating it with device data
    //from the database.
    populateDevices() {
      debugger;
      
      $.get('/api/devicePublicData/list', '', function(data) {
        debugger;
        
        var deviceList = data.collection;
      })
      .fail( function(jqxhr, textStatus, error) {
        //This is the error handler.
        debugger;

        log.push('Error while trying to list device public data in devicesView.js/populateDevices().');
        //sendLog();
        console.error('Communication error with server while execute devicesView.js/populateDevices()');
        
      });
    }
    
	});

  //debugger;
	return DevicesView;
});
