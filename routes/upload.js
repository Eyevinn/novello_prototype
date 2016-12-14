var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");
var monk = require("monk");
var db = monk('localhost:27017/novello');

function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

router.post('/', function(req, res) {
    req.session.channel = "testchannel";
    var videos= db.get("videos");
    var includes = db.get("includes");
    var sampleFile;
    sampleFile = req.files.upl;
    console.log(req.session.user);
    dir = "./public/uploads/"+req.session.user;
    channel = req.session.channel;
    checkDirectorySync(dir);
    sampleFile.mv('./public/uploads/' + req.session.user+"/"+ sampleFile.name, function(err) {
        if (err) {
            res.send("Upload failed" + err);
        }
        else {
            res.send('File uploaded!');
            cmd.get("pwd", function(data){
              console.log("path: " + data);
              command = "ffmpeg -i "+data+"/public/uploads/simon/video.mp4 out.m3u8"
              cmd.run(command);
              console.log(command);
            })
        }
    });
    videos.insert({path:'/uploads/' + req.session.user+"/"+ sampleFile.name, length:120, user:req.session.user, time: new Date(), });
    includes.insert({video:'/uploads/' + req.session.user+"/"+ sampleFile.name , channel: req.session.channel});
});
module.exports = router;
