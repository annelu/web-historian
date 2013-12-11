var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var urlArray = [];

exports.readUrls = function(filePath, cb){
  fs.readFile(filePath,'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    cb(data.split('\n'));
  });
};

exports.writeToFile = function(body, url, path){
  fs.writeFile('../data/sites/' + url, body, function(err, datum) {
    if (err) {
      throw err;
    }
    console.log('success!');
  });
};

exports.downloadUrls = function(urls) {

  var download = function(num){
    http.get('http://' + urls[num], function (res, err) {
      if (err) {
        throw err;
      }
      var body = '';
      res.on('data', function(chunk){
        body += chunk;
      });
      res.on('end', function(){
        exports.writeToFile(body, urls[num]); //figure out url
      });

    });
  };

  for (var i = 0; i < urls.length-1; i++) {
    download(i);
  }
  return true;
};
