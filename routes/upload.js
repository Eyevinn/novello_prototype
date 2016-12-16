var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var monk = require("monk");
var db = monk('localhost:27017/novello');
var ffmpeg = require("fluent-ffmpeg");

function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

function transcode(file, bitrate){
  clean_filename = file.split("/").slice(-1);
  clean_filename = clean_filename[0].split(".").slice(0);
  checkDirectorySync(file.split("/").slice(0,-1).join("/") + "/hls" + bitrate + "__" + clean_filename[0]+"/");
  output_path = file.split("/").slice(0,-1).join("/") + "/hls"+ bitrate +"__"+ clean_filename[0]+"/" + clean_filename[0] + ".m3u8";
  ffmpeg(file)
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .size('320x240')
    .videoBitrate(bitrate)
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      console.log('Processing finished !');
    })
    .save(output_path);
}

function create_manifest(file, dir){
  console.log(dir);
  console.log(file);
  clean_filename = file.split("/").slice(-1);
  console.log(clean_filename);
  clean_filename = clean_filename[0].split(".").slice(0);
  console.log(clean_filename);
  data = "#EXTM3U"+ "\n" +
  "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1200000"+ "\n" +
  "hls64__"+clean_filename[0]+"/"+clean_filename[0]+".m3u8"+ "\n" +
  "#EXT-X-STREAM-INF:PROGRAM-ID=1,BANDWIDTH=1500000"+ "\n" +
  "hls1200__"+clean_filename[0]+"/"+clean_filename[0]+".m3u8";
  fs.writeFile(dir+"/" + clean_filename[0]+".m3u8", data, function(){
    console.log("manifest written");
  })
}

router.post('/', function(req, res) {

    channel = "testchannel";

    var videos= db.get("videos");
    var includes = db.get("includes");
    var sampleFile;
    sampleFile = req.files.upl;
    console.log(req.session.user);
    dir = "./public/uploads/"+req.session.user;
    channel = channel;
    checkDirectorySync(dir);
    file = './public/uploads/' + req.session.user+"/"+ sampleFile.name;
    sampleFile.mv(file, function(err) {
        if (err) {
            res.send("Upload failed" + err);
        }
        else {
            res.send('File uploaded!');
            transcode(file, "64");
            //transcode(file, "400");
            //transcode(file, "1000");
            transcode(file, "32");
            create_manifest(file, dir);
        }
    });
    videos.insert({path:'/uploads/' + req.session.user+"/"+ sampleFile.name, length:120, user:req.session.user, time: new Date(), });
    includes.insert({video:'/uploads/' + req.session.user+"/"+ sampleFile.name , channel: channel});
});
module.exports = router;
