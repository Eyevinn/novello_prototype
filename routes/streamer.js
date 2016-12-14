var express = require('express');
var router = express.Router();
var ffmpeg = require("fluent-ffmpeg");




router.get('/', function(req, res, next) {
  ffmpeg('./video_test/video.mp4')
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .size('320x240')
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .save('./video_test/output.avi');

});

module.exports = router;
