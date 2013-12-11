// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var htmlFetchersHelpers = require('./lib/html-fetcher-helpers.js');
var fs = require('fs');
var url = require('url');
var path = require('path');
var http = require('http');
var datadir = path.join(__dirname, "../data/sites.txt");
// setInterval(); //call function repeatedly
htmlFetchersHelpers.readUrls(datadir, htmlFetchersHelpers.downloadUrls);