//This file registers with the server
'use strict';

/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: http://rpiovn.org/license 
 */

/*
 * Express Dependencies
 */
var express = require('express');
//var querystring = require("querystring");
//var requestHandlers = require("./requestHandlers.js");
//var gpsd = require('./lib/gpsd');
var fs = require('fs');
//var http = require('http'); //Used for GET and POST requests
//var Promise = require('node-promise');
//var Gpio = require('onoff').Gpio; //Used to read GPIO pins


//Local libraries based on the different featuers of this software
/*
var serverSettings = require('./assets/server_settings.json'); //This should be the first library loaded.
var GPSInterface = require('./lib/gps-interface.js');
var DataLog = require('./lib/data-log.js');
var ServerInterface = require('./lib/server-interface.js');
var WifiInterface = require('./lib/wifi.js');
var AppLogAPI = require('./lib/appLogAPI.js');
var Diagnostics = require('./lib/diagnostics.js');
*/

try {
  var deviceGUID = require('./assets/deviceGUID.json'); 
} catch(err) {
  console.error('Could not open the deviceGUID.json file!')
}


var app = express();
var port = 4000;

/*
 * Global Variables
 */
//app.locals.isTracking = false;

//Dev Note: I should make debugState a local varible in each library, so that I can turn debugging on
//for specific featuers like WiFi, GPS, data logging, server interface, etc.
global.debugState = true; //Used to turn verbose debugging off or on.


/*
global.gpsInterface = new GPSInterface.Constructor();
global.dataLog = new DataLog.Constructor();
global.serverInterface = new ServerInterface.Constructor();
global.wifiInterface = new WifiInterface.Constructor();
global.appLogAPI = new AppLogAPI.Constructor();
global.diagnostics = new Diagnostics.Constructor();
//dataLog.helloWorld();
*/

/*
//Backup the PM2 log if the device is configured for it.
try {
  if(serverSettings.backupPm2Log == "true") {
    global.appLogAPI.backupLog();
  } else {
    console.log('Leaving PM2 logs alone because backupPm2Log set to false');
  }
  
} catch(err) {
  console.error('Problem trying to read backupPm2Log setting. Err: ',err);
}
*/

/*
 * Use Handlebars for templating
 */
var exphbs = require('express3-handlebars');
var hbs;

// For gzip compression
//app.use(express.compress());

/*
 * Config for Production and Development
 */
app.engine('handlebars', exphbs({
    // Default Layout and locate layouts and partials
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/'
}));

// Locate the views
app.set('views', __dirname + '/views');

// Locate the assets
app.use(express.static(__dirname + '/assets'));


// Set Handlebars
app.set('view engine', 'handlebars');



/*
 * Routes
 */
//Allow CORS
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});

/*
//Request Handler/Webserver functions
app.use('/listLogFiles', requestHandlers.listLogFiles);
app.use('/queryTracking', requestHandlers.queryTracking);
app.use('/wifiSettings', global.wifiInterface.wifiSettings);
app.use('/saveSettings', requestHandlers.saveSettings);
app.use('/getLog', global.appLogAPI.getLog);
app.use('/syncLog', global.serverInterface.getSyncLog);
app.use('/startSync', global.serverInterface.startSync);
app.use('/stopSync', global.serverInterface.stopSync);
app.use('/updateSoftware', requestHandlers.updateSoftware);
app.use('/rebootRPi', requestHandlers.rebootRPi);
*/


//Save the listener to the Express app locals so I can access it in the request handlers.
//app.locals.listener = listener;



/*
 * Open a JSON file for recording GPS data
 */
/*
//This interval function checks every 10 second to see if valid time stamps are coming from the GPS.
//Once a valid time stamp arrives, it is used to generate the file names for the log files and opens or creates those log files.
var getGPSTimeStamp = setInterval(function() {
  //debugger;
  
  if(global.gpsInterface.timeStamp != undefined) {

    var timeStamp = global.gpsInterface.timeStamp;
    
    console.log('Time stamp retrieved from GPS: '+timeStamp+'. Opening log files.')
    
    //Error Handling
    if((global.gpsInterface.coordinateBuffer[0][0] == null) || (global.gpsInterface.coordinateBuffer[0][1] == null)) {
      console.log('GPS values are still null... waiting for more data.');
      return;
    } else {
      console.log('GPS values are good. Beging data logging.');
    }
      
    //Generate a file name based on the current date.
    //Dev Note: The RPi date/time can't be trusted. I should update this data with data from the GPS.
    global.dataLog.fileNameGeoJSONPoint = timeStamp.getFullYear()+'-'+('00'+(timeStamp.getUTCMonth()+1)).slice(-2)+'-'+('00'+(timeStamp.getUTCDate())).slice(-2)+'-PT'+'.json';
    global.dataLog.fileNameGeoJSONLineString = timeStamp.getFullYear()+'-'+('00'+(timeStamp.getUTCMonth()+1)).slice(-2)+'-'+('00'+(timeStamp.getUTCDate())).slice(-2)+'-LS'+'.json';
    global.dataLog.fileNameKMLPoint = timeStamp.getFullYear()+'-'+('00'+(timeStamp.getUTCMonth()+1)).slice(-2)+'-'+('00'+(timeStamp.getUTCDate())).slice(-2)+'-PT'+'.kml';
    global.dataLog.fileNameKMLLineString = timeStamp.getFullYear()+'-'+('00'+(timeStamp.getUTCMonth()+1)).slice(-2)+'-'+('00'+(timeStamp.getUTCDate())).slice(-2)+'-LS'+'.kml';
    global.dataLog.docName = timeStamp.getFullYear()+'-'+('00'+(timeStamp.getUTCMonth()+1)).slice(-2)+'-'+('00'+(timeStamp.getUTCDate())).slice(-2)+" Tracking Data";
    global.dataLog.docDesc = "Tracking data captured with the Raspberry Pi on "+timeStamp.getFullYear()+'-'+('00'+(timeStamp.getUTCMonth()+1)).slice(-2)+'-'+('00'+(timeStamp.getUTCDate())).slice(-2);
    
    //Read in the log files if they already exists. Otherwise create a new file.
    //First log file. 
    global.dataLog.readPointFile();
    //Second log file.
    global.dataLog.readLineStringFile();

    //Clear the interval once we've successfully retrieved the timestamp and opened the log files.
    clearInterval(getGPSTimeStamp);
    
    //Signal to global.dataLog.logData() that data can now be logged to the log files.
    global.dataLog.logFileOpened = true;
  }
  
}, 10000);
*/



/* BEGIN - Timer event to record GPS data to a file */ 
//Production
//global.dataLog.timeout = serverSettings.gpsDataLogTimeout;  //1000 = 1 second. 
//global.dataLog.fileSaveCnt = serverSettings.gpsFileSaveTimeoutCnt; //Number of intervals until the file is saved.

//Testing
//global.dataLog.timeout = 15000;  //1000 = 1 second.
//global.dataLog.fileSaveCnt = 1; //Number of intervals until the file is saved.

//Create an interval timer to periodically add GPS coordinates to the running log.
//Whenever the interval timer event triggers, all the coordinates that have been collected in the buffer get averaged.
//var intervalHandle = setInterval(global.dataLog.logData, global.dataLog.timeout);
/* END - Timer event to record GPS data to a file */ 


 /* BEGIN - SERVER INTERFACE FOR LOGGING TO SERVER */
//Skip this code if the serverInterface is not even set up.
/*
if(global.serverInterface != undefined) {
  //Sync only if RPi-Tracker is setup for WiFi client mode
  if(serverSettings.wifiType == "2") {
    if(serverSettings.syncOnBoot == "true") {
      console.log('syncOnBoot flag set to true and WiFi type is set to Client. Starting sync with Crumb Share server.');
      global.serverInterface.intervalHandle = setInterval(global.serverInterface.updateServer, global.serverInterface.timeout);
      
      //Also start uploading the IP address
      global.diagnostics.startIpSync();
    }
  }
}
*/
/* END - SERVER INTERFACE FOR LOGGING TO SERVER */


//Read the jumper and force default AP mode if the jumper is connected between GPIO pin 21 and ground.
//This feature needs to be turned on in server_settings.json and configured by following the instructions in the gpio directory.
/*
if(serverSettings.internalPullupConfigured == "true") {
  
  //console.log('serverSettings.internalPullupConfigured = '+serverSettings.internalPullupConfigured);
  
  var pin21 = new Gpio(21, 'in');
  pin21.read(function(err, value) {
    
    if(err) throw err;
    
    //If the pin is reading as a logic low or 0
    if(!value) {
      
      //Skip if the device is already configured for AP mode
      if(serverSettings.wifiType != "1") {
        //console.log('serverSettings.wifiType = '+serverSettings.wifiType);
        
        console.log('GPIO Pin 21 reading low, indicating jumper is on. Resetting device to factory-default AP mode...');

        //Reset the RPi into AP mode with the default settings.
        global.wifiInterface.makeAP();
      }
      
    }
    
  });
}


//Determine if previous settings need to be restored if the device has been rebooted several times 
//with rebootConfirmationNeeded set to true.
if(serverSettings.rebootConfirmationNeeded == "true") {
  global.wifiInterface.restoreCheck();
}
*/

/* Start up the Express web server */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);


// BEGIN GLOBAL UTILITY FUNCTIONS

//Save the serverSettings variable to file.
/*
global.saveServerSettings = function(thisServerSettings) {
  //Write out the server_settings.json file.
  fs.writeFile('./assets/server_settings.json', JSON.stringify(thisServerSettings, null, 4), function (err) {
    if(err) {
      console.log('Error in global.saveServerSettings() while trying to write server_settings.json file.');
      console.log(err);
    } else {
      console.log('global.saveServerSettings() executed. server_settings.json updated.');
    }
  });
}
*/
// END GLOBAL UTITLITY FUNCTIONS