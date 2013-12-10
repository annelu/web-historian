var path = require('path');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var htmlFetcherHelpers = require('../workers/lib/html-fetcher-helpers.js');

var writeToFile = function(body){
  fs.writeFile(module.exports.datadir, body, function(err, datum) {
    console.log("data to write", body);
    if (err) {
      console.log(err);
    }
    console.log('success!');
  });
};

module.exports.handleRequest = function (req, res) {
  var status = 200;

  if (req.method === 'POST') {
    status = 302;
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end', function(){
      body = body.slice(4);
      body += '\n';
      writeToFile(body);
    });
    httpHelpers.serveStaticAssets(res, req.url, status);
  } else {
    if (req.url === '/') {
      httpHelpers.serveStaticAssets(res, req.url, status);
    } else {
      htmlFetcherHelpers.readUrls(module.exports.datadir, function(data){
        var truthTest = false;
        for (var i = 0; i < data.length; i++) {
          if (data[i] === req.url) {
            console.log(data[i], req.url);
            truthTest = true;
          }
        }
        if (truthTest === false) {
          status = 404;
          httpHelpers.serveStaticAssets(res, req.url, status);
        }
      });
    }
    httpHelpers.serveStaticAssets(res, req.url, status);
  }
};
