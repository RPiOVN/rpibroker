/*
Dev Note: 12/21/16
Bootstrap table export is a very fragile, complicated piece of software that is not maintained. Chances are good
it will break in the future with no support to fix it. 
*/

/*global define*/
//Define libraries this file depends on.
define([
	'jQuery-2.1.4.min',
	'underscore_1.3.3',
	'backbone_0.9.2',  
  
  //https://github.com/hhurz/tableExport.jquery.plugin
  '/js/lib/tableExport.js',
  '/js/lib/jquery.base64.js',

  'text!../../../js/logwork/templates/WorkReport.html',
  '/js/lib/bootstrap-table-export.js',
], function ($, _, Backbone, 
              TableExport, jQueryBase64,
              WorkReportTemplate, BootstrapTableExport) {
	'use strict';

	var WorkReportView = Backbone.View.extend({

		tagName:  'div',
    
    el: '#workReportView', 

		template: _.template(WorkReportTemplate),

		// The DOM events specific to an item.
		events: {
      'click #exportButton': 'exportTable'
		},

		initialize: function () {

     
		},

    render: function () {
      try {
        //debugger;

        this.$el.html(this.template);

        $('#WorkReportView').show();

        //Hide the initial 'Loading...' message.
        this.$el.find('#resultsMessage').hide();

        //this.$el.find('#resultsTable').bootstrapTable({
        this.$el.find('#resultsTable').bootstrapTable({
          sortName: 'date',
          sortOrder: 'desc',
          showExport: true,
          //exportDataType: 'selected',
          //exportType: ['csv', 'excel', 'json', 'txt'],
          //exportOptions: {
          //  fileName: 'RPiOVN-Work-Log',
          //  type: 'csv'
          //},
          columns: [{
            field: 'date',
            title: 'Date',
            sortable: true
          }, {
            field: 'user',
            title: 'User',
            sortable: true
          }, {
            field: 'project',
            title: 'Project',
            sortable: true
          }, {
            field: 'typeOfWork',
            title: 'Type of Work',
            sortable: true
          }, {
            field: 'hours',
            title: 'Hours',
            sortable: true
          }, {
            field: 'description',
            title: 'Description',
            sortable: true
          }, {
            field: 'edit',
            title: 'Edit',
            sortable: false
          }         
           ],

        });

        this.populateTable();
        //$('#resultsTable').tableExport();

      } catch(err) {
        debugger;
        var msg = 'Error in WorkReportView.js/render() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the modal window if it's open.
      }
        
			return this;
		},
    
    //openModal: function() {
      //debugger;
      //global.modalView.render();
    //  global.modalView.openModal();
    //},
    
    //This function populates the table with all Work Log data.
    populateTable: function() {
      try {
        //debugger;

        var tableData = [];

        //Loop through each item in the log work collection.
        for(var i=0; i < global.logWorkCollection.length; i++) {
          var thisModel = global.logWorkCollection.models[i];

          var projectName = this.getProjectName(thisModel.get('project'));
          var userName = this.getUserName(thisModel.get('user'));
          var dateStr = this.getDateStr(new Date(thisModel.get('startTime')));

          var lineItem = new Object();
          //lineItem.entry = i;
          lineItem.date = dateStr;
          lineItem.user = userName;
          lineItem.project = projectName;
          lineItem.typeOfWork = thisModel.get('typeOfWork');
          lineItem.hours = thisModel.get('hours');
          lineItem.description = thisModel.get('details');

          //Replace newline characters with html <br> to force new line.
          lineItem.description = lineItem.description.replace(/(\r\n|\n|\r)/gm,"<br>");
          
          //Error Handling
          if(lineItem.description.indexOf('<iframe>') != -1)
            lineItem.description = 'Text contains invalid HTML elements';
          
          if(thisModel.get('user') == userdata._id) {
            lineItem.edit = '<button class="btn btn-small btn-default" onclick="global.workReportView.editEntry(\''+i+'\')" >Edit</button>'  
          } else {
            lineItem.edit = '';
          }


          tableData.push(lineItem);
        }

        this.$el.find('#resultsTable').bootstrapTable('load', tableData);
        log.push('Updated table with work log records.');
      } catch(err) {
        debugger;
        var msg = 'Error in WorkReportView.js/populateTable() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        alert('There was an error with this page. An error log has been email to the administrator. Please refresh your browser and try again.');
        
        global.modalView.closeModal(); //Hide the modal window if it's open.
      }
    },
    
    exportTable: function() {
      debugger;
      
      //https://github.com/hhurz/tableExport.jquery.plugin
      //$('#resultsTable').tableExport({
      //  type: 'csv', 
      //  fileName: 'test',
      //  htmlContent: false
      //});
      
    },
    
    //This function returns the name of a project based on the input string which should contain a project GUID.
    //This function returns "Not Found" if a projectId could not be found.
    getProjectName: function(projectId) {
      
      
      var outStr = "Not Found";
      
      try {
        var model = global.projectCollection.get(projectId);  
        
        outStr = model.get('title');
      } catch(err) {
        debugger;
        var msg = 'Error in WorkReportView.js/getProjectName() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the modal window if it's open.
      }
      
      return outStr;
    },
    
    //This function returns the name of a user based on the input string which should contain a user GUID.
    //This function returns "Not Found" if a projectId could not be found.
    getUserName: function(userId) {
      //debugger;
      
      var outStr = "Not Found";
      
      try {
        var model = global.userCollection.get(userId);  
        
        var name = model.get('name');
        outStr = name.first+' '+name.last;
        
      } catch(err) {
        debugger;
        var msg = 'Error in WorkReportView.js/getUserName() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the modal window if it's open.
      }
      
      return outStr;
    },
    
    //This function converts an inpute Date object into a string corresponding the MM-DD-YY
    getDateStr: function(dateIn) {
      try {
        //debugger;

        var date = '00'+(dateIn.getUTCDate());
        date = date.slice(-2);

        var month = '00'+(dateIn.getUTCMonth()+1);
        month = month.slice(-2);

        var year = dateIn.getFullYear().toString();
        //year = year.slice(-2);

        return year+'-'+month+'-'+date;
      } catch(err) {
        debugger;
        var msg = 'Error in WorkReportView.js/getDateStr() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the modal window if it's open.
      }
    },
    
    //This function is called whenever the user clicks on the Edit button next to a work entry.
    //It passes the model for that entry on to the logWorkView, to be edited.
    editEntry: function(i) {
      try {
        //debugger;
        var thisModel = global.logWorkCollection.models[i];
        global.logWorkView.loadEntry(thisModel);
        
      } catch(err) {
        debugger;
        var msg = 'Error in WorkReportView.js/editEntry() Error: '+err.message;
        console.error(msg);
        log.push(msg);
        sendLog();
        
        global.modalView.closeModal(); //Hide the modal window if it's open.
      }
    }
    
    
	});

  //debugger;
	return WorkReportView;
});
