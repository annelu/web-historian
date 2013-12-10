var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath,'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    cb(data.split('\n'));
  });
};

var writeToFile = function(body, file){
  fs.writeFile('../data/sites/' + 'www.yahoo.com', body, function(err, datum) {
    if (err) {
      console.log(err);
    }
    console.log('success!');
  });
};

exports.downloadUrls = function(urls) {
  var result = [1];
  http.get('http://www.' + "yahoo.com", function (res, err) {
    if (err) {
      console.log(err);
    }
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      writeToFile(body, url); //figure out url
    });
    // console.log("HEADERS", res.headers, "BODY", res.all);
  });
  return true;
};
