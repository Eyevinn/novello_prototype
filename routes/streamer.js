var express = require('express');
var router = express.Router();
var ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");

function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}




router.get('/', function(req, res, next) {
  transcode(req.query.input_file, "200");
  transcode(req.query.input_file, "400");
  transcode(req.query.input_file, "1000");
  transcode(req.query.input_file, "1200");

});

module.exports = router;
