var path = require('path');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
var mysql = require("mysql");
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
  fs.appendFile(module.exports.datadir, body, function(err, datum) {
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
    // console.log('data we are trying to read', data, 'data we are trying to read');
    httpHelpers.serveStaticAssets(res, data, status, type);
  });
};


module.exports.handleRequest = function (req, res) {
  var connectToDB = mysql.createConnection({
    "hostname": "localhost",
    "user": "root",
    "password": "",
    "database": "urlstorage"
  });
  var status = 200;
  connectToDB.connect(function(error) {
    if (error) {
        return console.log("CONNECTION error: " + error);
    }
  });
  connectToDB.query('SELECT * FROM urladdresses2', function(err, row, columns) {
    if (err) throw err;
  });

  if (req.method === 'POST') {
    status = 302;
    var body = '';
    req.on('data', function(chunk){
      body += chunk;
    });
    req.on('end', function(){
      body = body.slice(4);
      body += '\n';
      console.log('BODY: ', body);
      writeToFile(body);
      var post = {urladdress: body};
      console.log('POST: ', post);

      connectToDB.query('INSERT INTO urladdresses2 SET ?', post, function(err, row, columns) {
        if (err) throw err;
        console.log('SUCCESSFULLY');
      });
    });
    readFile(res, 'success.html', status);
  } else {
    var mimeType = mimeTypes[req.url.split('.')[1]];
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
