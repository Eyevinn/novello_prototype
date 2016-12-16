var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');
var sha256 = require('sha256');

/* GET CHANNELLIST PAGE */
router.get('/', function(req, res) {
    if(req.session.user){
      res.locals.user = req.session.user;
      res.locals.online = true;
      var channels = db.get('channels');
      var includes = db.get('includes');

      channels.find({},{},function(e,docs){
          res.render('channellist', {"channellist" : docs});
      });
    }else{
      res.redirect("/index");
    }

});

module.exports = router;
