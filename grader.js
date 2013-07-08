#!/usr/bin/env node
/*
Automatically grade files for presence of specified HTML tags/attributes.
Use commander.js and cheerio. Teaches command line application development and basic DOM parsing.

References:

+ cheerio
   - https://github.com/MatthewMueller/cheerio
   - http://encosia.com/cheerio-faster-windows-friendly-alternative-jsdom/
   - http://maxogden.com/scraping-with-node.html

 + commander.js
   - https://github.com/visionmedia/commander.js
   - http://tjholowaychuk.com/post/9103188408/commander-js-nodejs-command-line-interfaces-made-easy

 + JSON
   - http://en.wikipedia.org/wiki/JSON
   - https://developer.mozilla.org/en-US/docs/JSON
   - https://developer.mozilla.org/en-US/docs/JSON#JSON_in_Firefox_2
*/

var fs = require('fs');
var program = require('commander');
var cheerio = require('cheerio');
var restler = require('restler');
var HTMLFILE_DEFAULT = "index.html";
var CHECKSFILE_DEFAULT = "checks.json";

var assertFileExists = function(infile) {
  var instr = infile.toString();
  if (!fs.existsSync(instr)) {
    console.log("%s does not exists. Exiting.", instr);
    process.exit(1);
  }
  return instr;
};

var cheerioHtmlFile = function(htmlfile) {
  return cheerio.load(fs.readFileSync(htmlfile));
};

var loadChecks = function(cheksfile) {
  return cheerio.load(fs.readFileSync(htmlfile));
};

var htmlFileToString = function(htmlfile, checksfile) {
  return fs.readFileSync(htmlfile);
};

var loadChecks = function(checksfile) {
  return JSON.parse(fs.readFileSync(checksfile));
};

var checkHtml = function(html, checksfile) {
  //$ = cheerioHtmlFile(htmlfile);
  $ = cheerio.load(html);
  var checks = loadChecks(checksfile).sort();
  var out = {};
  for(var ii in checks) {
    var present = $(checks[ii]).length > 0;
    out[checks[ii]] = present;
  }
  var outJson = JSON.stringify(out, null, 4);
  console.log(outJson);
};

var clone = function(fn) {
  // Workaround for commander.js issue.
  // http://stackoverflow.com/a/6772648
   return fn.bind({});
};

if(require.main == module) {
   program
      .option('-c, --checks <check_file>', 'Path to checks.json', clone(assertFileExists), CHECKSFILE_DEFAULT)
      .option('-f, --file <html_file>', 'Path to index.html', clone(assertFileExists), HTMLFILE_DEFAULT)
      .option('-u, --url <url_page>', 'url to index.html', function() {}, null)
      .parse(process.argv);
  if (program.file && program.url) {
    console.log("You can't mix both options, -f and -u. Choose only one of them.");
    exit(1);
  }
  if (program.url) {
    restler.get(progrma.url).on('complete', function(data) {
                                             checkHtml(data, program.checks);
    });
  } else {
    checkHtml(htmlFileToString(program.file), program.checks); 
  }
} else {
  exports.checkHtmlFile = checkHtmlFile;
}
