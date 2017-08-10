//Node.js module used to execute command line programs.
//var exec = require("child_process").exec;

//LIBRARIES
/*
var querystring = require("querystring");
var fs = require('fs'); //file system library
var parse = require('csv-parse'); //CSV parser
//var transform = require('stream-transform'); //data streams transformer
var serverhtml = require('./page_html.js'); //HTML strings for building pages.
var et = require('elementtree'); //Library used for XML parsing.
var events = require('events').EventEmitter; //Event emitter library.
var rander = require('rander'); //Library used to generate UniqueIDs.
var ya_csv = require('ya-csv'); //Ya-csv library used to output csv files.
var exec = require('child_process').exec; //Used to execute command line instructions.
var serverSettings = require('./assets/server_settings.json');
var spawn = require('child_process').spawn; //Used to execut sudo level commands
var sudo = require('sudo'); //Used to execut sudo level commands with spawn
*/

//GLOBAL VARIABLES
//var CSVData = new Array(); //Object to hold CSV data
//var UniqueIDList = new Array(); //List of UniqueIDs in the CSV file
//var Location = new Object(); //Location object
//var CustomEvent = new events(); //Custom event object
//var globalResponse = new Object(); //Used to pass response context between functions.


// CUSTOMIZATION VARIABLES
//var wwwDir = '/inetpub/wwwroot/'  //Windows 2008 Server
//var wwwDir = '/var/www/'          //Linux
//var wwwDir = './'                   //Node/Express
//var sudoPassword = "raspberry"; //The root password required when running 'sudo' commands.



/******************************************************************************
Summary:
listLogFiles() performs a listing of the 'data' directory and returns an array
of strings representing the file names in that directory.
******************************************************************************/
function listLogFiles(request, response, next) {
  console.log("Request handler 'listLogFiles()' was called.");
  //debugger;
  //Execute a list of the data files.
  //Filtering for just *-LS.json reduces noise and complexity, since I know there will be 4 files and what the end of their file names will be.
  exec('ls ./assets/logfiles/20*-LS.json', function(err, stdout, stderr) {
    //debugger;
    
    //Split the string by the new line character.
    var fileList = stdout.split("\n");
    
    //If any elements are empty strings, then remove them.
    for(var i = 0; i<fileList.length; i++) {
      if(fileList[i] == "") {
        fileList.splice(i, 1);
      }
    }
    
    response.send(fileList);
  });
}

/******************************************************************************
Summary:

******************************************************************************/
function rentPort(request, response, next) {
  debugger;
}

/******************************************************************************
Summary:

******************************************************************************/
function returnPort(request, response, next) {
  debugger;
}

exports.rentPort = rentPort;
exports.returnPort = returnPort;

