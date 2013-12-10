var path = require('path');
var fs = require('fs');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.writeResponse = function(res, input, status){
  var thingToWrite;
  if (input === '/') {
    thingToWrite = "<input></input>";
  } else {
    thingToWrite = input;
  }
  res.writeHead(status, headers);
  res.end(thingToWrite);
};

exports.serveStaticAssets = function(res, folder, status, asset) {
  //Write some code here that helps serve up your static files!
  //(Static files are things like html (yours or arhived from others...), css, or anything that doesn't change often.)
  //console.log("IM BEING CALLED");
  exports.writeResponse(res, folder, status);
};

// As you go through, keep thinking about what helper functions you can put here!