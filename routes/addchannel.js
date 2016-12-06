var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');
var sha256 = require('sha256');

/*  GET NEW CHANNEL PAGE */
router.get('/', function(req, res) {
    res.render('addchannel', { title: 'Add Channel' });
});

/* ADD CHANNEL TO DB */
router.post('/', function(req, res) {
    var channelName = req.body.channelName;
    console.log("Channel name: " + channelName);
    console.log(db);
    var channellist = db.get('channels');
    console.log("Channel list: " + channellist);

    channellist.insert({
        "channel" : channelName,
    }, function (err, doc) {
        if (err) {
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect("/channellist");
        }
    });
});

module.exports = router;
