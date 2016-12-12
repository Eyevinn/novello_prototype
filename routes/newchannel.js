var express = require('express');
var router = express.Router();

/*  GET New Channel page */
router.get('/newchannel', function(req, res) {
    res.render('newchannel', { title: 'Add/Remove Channel' });
});

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
            for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

/* POST to Add User Service */
router.post('/addchannel', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var channelName = req.body.channelName;

    // Set our collection
    var channellist = db.get('Channels');

    // Submit to the DB
    channellist.insert({
        "channel" : channelName,
        "color" : randomColor();
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            //res.location("userlist");
            // And forward to success page
            res.redirect("channellist");
        }
    });
    channellist.remove({
        "channel" : channelName,
    }, function (err, doc) {
        if (err) {
            res.send("No such name in the database!");
        }
        else {
            res.redirect("channellist");
        }
    })
});
/* POST to Add User Service */
router.post('/removechannel', function(req, res) {
    var db = req.db;
    var channelName = req.body.channelName;
    var channellist = db.get('Channels');

    // REMOVE FROM DB
    channellist.remove({
        "channel" : channelName,
    }, function (err, doc) {
        if (err) {
            res.send("No such name in the database!");
        }
        else {
            res.redirect("channellist");
        }
    })
});

module.exports = router;
