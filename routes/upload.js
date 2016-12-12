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
    var videos= db.get("videos");
    var sampleFile;
    sampleFile = req.files.upl;
    console.log(sampleFile);
    dir = "./uploads/"+req.session.user;
    //channel = req.session.channel;
    checkDirectorySync(dir);
    sampleFile.mv('./uploads/' + req.session.user+"/"+ sampleFile.name, function(err) {
        if (err) {
            res.send("Upload failed" + err);
        }
        else {
            res.send('File uploaded!');
        }
    });
    //videos.insert({path:'./uploads/' + req.session.user+"/"+ sampleFile.name, length:120, user:"simon wallin", time: now, });

});
module.exports = router;
