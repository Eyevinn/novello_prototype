var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");
var fs = require("fs");


function checkDirectorySync(directory) {
  try {
    fs.statSync(directory);
  } catch(e) {
    fs.mkdirSync(directory);
  }
}

router.post('/', function(req, res) {
    var sampleFile;
    sampleFile = req.files.upl;
    checkDirectorySync("./uploads/"+req.session.user);
    sampleFile.mv('./uploads/' + req.session.user+"/"+ sampleFile.name, function(err) {
        if (err) {
            res.send("Upload failed" + err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});
module.exports = router;
