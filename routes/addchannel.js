var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');
var sha256 = require('sha256');

function getRandomColor() {
    //var letters = '0123456789ABCDEF';
    //var color = '#';
    var color = Math.floor(Math.random()*16777215).toString(16);
    //for (var i = 0; i < 6; i++ ) {
    //    color += letters[Math.floor(Math.random() * 1)];
   // }
    return color;
}

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
        "color" : getRandomColor(),
    });
    console.log(includes);
});

module.exports = router;
