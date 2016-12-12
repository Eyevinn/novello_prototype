var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');


/*  GET NEW CHANNEL PAGE */
//router.get('/', function(req, res) {
//    res.render('removechannel', { title: 'Remove Channel' });
//});

/* REMOVE CHANNEL FROM DB */

router.get('/', function(req, res) {
    if(req.session.admin && req.query.sure == "yes"){
      users = db.get("users");
      includes = db.get("includes");
      videos = db.get("videos");
      seen = db.get("seen");
      follows = db.get("follows");
      channels = db.get("channels");
      users.remove({});
      includes.remove({});
      videos.remove({});
      seen.remove({});
      follows.remove({});
      channels.remove({});
    }else{
      res.send("ah ah ah! Not allowed, shame on you!")
    }



});

module.exports = router;
