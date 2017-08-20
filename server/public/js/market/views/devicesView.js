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
      'click #addNewDeviceBtn': 'loadDeviceEditor'
		},

		initialize: function () {

		},

    render: function () {
      //debugger;
      
      this.$el.html(this.template);
      
      $('#devicesView').show();
      
			return this;
		},
    
    openModal: function() {
      //debugger;
      //global.modalView.render();
      global.modalView.openModal();
    },
    
    loadDeviceEditor: function() {
      debugger;
      
      global.deviceEditorView.render();
    }
    
	});

  //debugger;
	return DevicesView;
});
