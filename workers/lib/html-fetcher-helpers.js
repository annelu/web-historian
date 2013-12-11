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
  console.log('url', url);
  fs.writeFile('../data/sites/' + url, body, function(err, datum) {
    if (err) {
      throw err;
    }
    console.log('success!');
  });
};

exports.downloadUrls = function(urls) {
  for (var i = 0; i < urls.length - 1; i++) {
    urlArray.push(urls[i]);
    http.get('http://' + urlArray[0], function (res, err) {
      if (err) {
        throw err;
      }

      var body = '';

      res.on('data', function(chunk){
        body += chunk;
      });
      res.on('end', function(){
        exports.writeToFile(body, urlArray[i]); //figure out url
      });

    });
  }

  return true;
};
