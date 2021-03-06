/*global define*/
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',
	'text!../../../js/market/templates/leftMenu.html'
], function ($, _, Backbone, LeftMenuTemplate) {
	'use strict';

	var LeftMenuView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#leftMenu',

		template: _.template(LeftMenuTemplate),

		// The DOM events specific to an item.
		events: {
			//'click .toggle':	'toggleCompleted',
			//'dblclick label':	'edit',
			//'click .destroy':	'clear',
			//'keypress .edit':	'updateOnEnter',
			//'keydown .edit':	'revertOnEscape',
			//'blur .edit':		'close'
      'click #dashboardLink': 'showDashboard',
      //'click #logWorkLink': 'showLogWork',
      //'click #workReportLink': 'showWorkReport',
      //'click #viewProjects': 'showProjectView',
      'click #editProfileLink': 'showEditProfile',
      'click #marketLink': 'showMarket',
      'click #rentalLink': 'showRental',
      'click #devicesLink': 'showDevices'
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			//this.listenTo(this.model, 'change', this.render);
			//this.listenTo(this.model, 'destroy', this.remove);
			//this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the titles of the todo item.
		render: function () {
			//this.$el.html(this.template(this.model.toJSON()));
      this.$el.html(this.template);
			//this.$el.toggleClass('completed', this.model.get('completed'));

			//this.toggleVisible();
			//this.$input = this.$('.edit');
			return this;
		},
    
    showDashboard: function() {
      //debugger;
      
      //Hide old Views and show new one.
      $('#dashboardView').show();
      $('#editProfileView').hide();
      $('#marketView').hide();
      $('#rentalView').hide();
      $('#devicesView').hide();
      
      
      //Remove the 'active' class from the menu item, unless it's a treeview menu item.
      //(treeview) menu items will remove their active class in their click event.
      if( !$('.sidebar-menu').find('.active').hasClass('treeview') )
        $('.sidebar-menu').find('.active').removeClass('active');
      else
        this.closeCollapsableLeftMenu();
      
      //Switch the 'active' class to the selected menu item
      $('#dashboardLink').parent().addClass('active');
      
    
      $('#app-location').text('Dashboard');
    },
    
    showEditProfile: function() {
      $('#dashboardView').hide();
      $('#editProfileView').show();
      $('#marketView').hide();
      $('#rentalView').hide();
      $('#devicesView').hide();
      
      $('#app-location').text('Edit Profile');
      
      //Show Data Files Help
      //global.helpView.showProfileHelp();
      
      //Remove the 'active' class from the menu item, unless it's a treeview menu item.
      //(treeview) menu items will remove their active class in their click event.
      if( !$('.sidebar-menu').find('.active').hasClass('treeview') )
        $('.sidebar-menu').find('.active').removeClass('active');      
      //Switch the 'active' class to the selected menu item
      $('#editProfileLink').parent().addClass('active');
      
      global.editProfileView.render();
    },
    
    showMarket: function() {
      $('#dashboardView').hide();
      $('#editProfileView').hide();
      $('#marketView').show();
      $('#rentalView').hide();
      $('#devicesView').hide();
      
      $('#app-location').text('Marketplace');
      
      //Show Data Files Help
      //global.helpView.showProfileHelp();
      
      //Remove the 'active' class from the menu item, unless it's a treeview menu item.
      //(treeview) menu items will remove their active class in their click event.
      if( !$('.sidebar-menu').find('.active').hasClass('treeview') )
        $('.sidebar-menu').find('.active').removeClass('active');      
      //Switch the 'active' class to the selected menu item
      $('#marketLink').parent().addClass('active');
      
      global.marketView.render();
    },
    
    showRental: function() {
      $('#dashboardView').hide();
      $('#editProfileView').hide();
      $('#marketView').hide();
      $('#rentalView').show();
      $('#devicesView').hide();
      
      $('#app-location').text('Rentals');
      
      //Show Data Files Help
      //global.helpView.showProfileHelp();
      
      //Remove the 'active' class from the menu item, unless it's a treeview menu item.
      //(treeview) menu items will remove their active class in their click event.
      if( !$('.sidebar-menu').find('.active').hasClass('treeview') )
        $('.sidebar-menu').find('.active').removeClass('active');      
      //Switch the 'active' class to the selected menu item
      $('#rentalLink').parent().addClass('active');
      
      global.rentalView.render();
    },
    
    showDevices: function() {
      $('#dashboardView').hide();
      $('#editProfileView').hide();
      $('#marketView').hide();
      $('#rentalView').hide();
      $('#devicesView').show();
      
      $('#app-location').text('Owned Devices');
      
      //Show Data Files Help
      //global.helpView.showProfileHelp();
      
      //Remove the 'active' class from the menu item, unless it's a treeview menu item.
      //(treeview) menu items will remove their active class in their click event.
      if( !$('.sidebar-menu').find('.active').hasClass('treeview') )
        $('.sidebar-menu').find('.active').removeClass('active');      
      //Switch the 'active' class to the selected menu item
      $('#devicesLink').parent().addClass('active');
      
      global.devicesView.render();
    },
    
    //This function copied from adminlte.js. Moved here as it controls the animation of this view
    //and the animation was getting screwed up.
    treeMenu: function(e, linkElem) {
      //debugger;
      
      try {

        //Get the clicked link and the next element
        var $this = $(linkElem);
        var checkElement = $this.next();
        var animationSpeed = $.AdminLTE.options.animationSpeed;
        var _this = $.AdminLTE;

        //Check if the next element is a menu and is visible
        if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
          //Close the menu
          checkElement.slideUp(animationSpeed, function () {
            checkElement.removeClass('menu-open');
            //Fix the layout in case the sidebar stretches over the height of the window
            //_this.layout.fix();
          });
          checkElement.parent("li").removeClass("active");
        }
        //If the menu is not visible
        else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
          //Get the parent menu
          var parent = $this.parents('ul').first();
          //Close all open menus within the parent
          var ul = parent.find('ul:visible').slideUp(animationSpeed);
          //Remove the menu-open class from the parent
          ul.removeClass('menu-open');
          //Get the parent li
          var parent_li = $this.parent("li");

          //Open the target menu and add the menu-open class
          checkElement.slideDown(animationSpeed, function () {
            //Add the class active to the parent li
            checkElement.addClass('menu-open');
            parent.find('li.active').removeClass('active');
            parent_li.addClass('active');
            //Fix the layout in case the sidebar stretches over the height of the window
            _this.layout.fix();
          });
        }
        //if this isn't a link, prevent the page from being redirected
        if (checkElement.is('.treeview-menu')) {
          try{
            e.preventDefault();
          } catch(err) {
            if( e == undefined ) {
              log.push('treeMenu() called without event.');
            } else {
              console.error('Unhandled error in treeMenu() in leftMenuView.js. Error:');
              console.error(err.message);

              log.push('Unhandled error in treeMenu() in leftMenuView.js. Error:');
              log.push(err.message);
              sendLog();
            }
          }
        }
      } catch(err) {
        debugger;
        var msg = 'Error in leftMenuView.js/treeMenu() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the waiting screen.
      }
    },
    
    //This function is called to close collapsable menus.
    closeCollapsableLeftMenu: function() {
      //debugger;
      
      var $this = $('.menu-open').parent().find('a');
      var checkElement = $this.next();
      var animationSpeed = $.AdminLTE.options.animationSpeed;
      
      //Check if the next element is a menu and is visible
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
        //Close the menu
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');
          //Fix the layout in case the sidebar stretches over the height of the window
          //_this.layout.fix();
        });
        checkElement.parent("li").removeClass("active");
      }
    },
    
		
	});

  //debugger;
	return LeftMenuView;
});
