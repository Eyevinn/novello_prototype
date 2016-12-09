var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');
var sha256 = require('sha256');

/*  GET NEW CHANNEL PAGE */
//router.get('/', function(req, res) {
//    res.render('removechannel', { title: 'Remove Channel' });
//});

/* REMOVE CHANNEL FROM DB */
router.post('/', function(req, res) {

    var userName = req.body.userName;
    var channellist = db.get('users');

    channellist.remove({
        "username" : userName,
    }, function (err, doc) {
        if (err) {
            res.send("No such name in the database!");
        }
        else {
          if(req.session.admin){
            res.redirect("/admin")
          }else{
            res.redirect("channellist");
          }
        }
    })
});

module.exports = router;
