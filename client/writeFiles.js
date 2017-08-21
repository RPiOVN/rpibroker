//This program writes out the Dockerfile and modified reverse-tunnel.js files.

/*
 * Copyright 2017 RPiOVN.org
 * Licensing Information: http://rpiovn.org/license 
 */

var fs = require('fs');


var port="6101";
var username = "testname";
var password = "testpass";


function writeDockerfile(port, username, password) {

  var testString = "This is a test. This should get written to the file.\n\nThis should be on a new line.\n";
  
  fs.writeFile('./assets/test.txt', testString, function (err) {

    if(err) {
      debugger;
      console.error('Error while trying to write file: ', err);

    } else {
      console.log('File written successfully!');
    }
  });
}
writeDockerfile(port, username, password);