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
    //Get channelname from view 
    var channelName = req.body.channelName;

    //Get db acces 
    var channellist = db.get('channels');
    var includes = db.get('includes');

    //add channelname to "channels" collection
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
    //add to "includes" collection
    includes.insert({
        "channel" : channelName,
    });
    console.log(includes);
});

module.exports = router;
