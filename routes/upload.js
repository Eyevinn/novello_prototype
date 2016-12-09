var express = require('express');
var router = express.Router();
var multer = require("multer");
var path = require("path");


router.post('/', function(req, res) {
    var sampleFile;
    sampleFile = req.files.upl;
    sampleFile.mv('./uploads/' + sampleFile.name, function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });

});
module.exports = router;
