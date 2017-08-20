/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  'text!../../../js/market/templates/deviceEditor.html'
], function ($, _, Backbone, DeviceEditorTemplate) {
	'use strict';

	var DeviceEditorView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#deviceEditorView', 

		template: _.template(DeviceEditorTemplate),

		// The DOM events specific to an item.
		events: {
      'click #submitButton': 'addDevice'
		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#deviceEditorView').show();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    },
    
    loadDeviceEditor: function() {
      debugger;
      
      $('#deviceEditorView').slideDown();
    },
    
    addDevice: function() {
      debugger;
      
      var deviceName = this.$el.find('#deviceName').val();
      var deviceDesc = this.$el.find('#deviceDescription').val();
      
      //Error handling
      if( (deviceName == "") || (deviceDesc == "") ) {
        global.modalView.errorModal('Please enter a name and description for the device.');
        return;
      }
      
      
    }
    
	});

  //debugger;
	return DeviceEditorView;
});
