var path = require('path');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var htmlFetcherHelpers = require('../workers/lib/html-fetcher-helpers.js');
var responseDirectory;
var mimeTypes = {
  'js' : 'text/javascript',
  'css' : 'text/css',
  'txt' : 'text/plain',
  'ico' : 'image/x-icon'
};

var writeToFile = function(body){
  fs.writeFile(module.exports.datadir, body, function(err, datum) {
    if (err) {
      console.log(err);
    }
    console.log('success!');
  });
};

var readFile = function(res, filename, status, type){
  // console.log(filename);
  fs.readFile('public/' + filename, 'utf-8', function(err, data) {
    if (err) {
      throw err;
    }
    console.log('data we are trying to read', data, 'data we are trying to read');
    httpHelpers.serveStaticAssets(res, data, status, type);
  });
};


module.exports.handleRequest = function (req, res) {
  var status = 200;
  if (req.method === 'POST') {
    console.log('a post happened!');
    status = 302;
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end', function(){
      body = body.slice(4);
      body += '\n';
      console.log('body',body);
      writeToFile(body);
    });
    readFile(res, 'success.html', status);
  } else {
    var mimeType = mimeTypes[req.url.split('.')[mimeTypes.length - 1]];
    if (req.url === '/') {
      // httpHelpers.serveStaticAssets(res, readFile('index.html'), status);
      readFile(res, 'index.html', status);
     } else {
      readFile(res, req.url, status, mimeType);
     }



     //else {
    //   htmlFetcherHelpers.readUrls(module.exports.datadir, function(data){
    //     var truthTest = false;
    //     for (var i = 0; i < data.length; i++) {
    //       if (data[i] === req.url) {
    //         console.log(data[i], req.url);
    //         truthTest = true;
    //       }
    //     }
    //     if (truthTest === false) {
    //       status = 404;
    //       httpHelpers.serveStaticAssets(res, req.url, status);
    //     }
    //   });
    // }
    // httpHelpers.serveStaticAssets(res, req.url, status);
  }
};
