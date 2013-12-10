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

var writeToFile = function(body){
  fs.writeFile('../../data/sites/', body, function(err, datum) {
    console.log("data to write", body);
    if (err) {
      console.log(err);
    }
    console.log('success!');
  });
};

exports.downloadUrls = function(urls){
  var result = [1];
  for (var i = 0; i < urls.length; i++) {
    console.log(urls);
  }
  http.get('http://'+urls, function (err, res) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(res.code, res.headers, res.buffer.toString());
  return result;
});
};
