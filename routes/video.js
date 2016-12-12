var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var db_init = require(appRoot +'/db/db_init');
var fs = require("fs");
var util = require("util");
var vidStreamer = require("vid-streamer");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');

//console.log(db_init.authenticate("simon wallin","sw0049sw"));
var bodyParser = require('body-parser');
/* GET home page. */



router.get('/', function(req, res, next){
  console.log(req.query);
  includes = db.get("includes");
  includes.find({"channel": req.query.channel},function(err, result){
    res.render("video", {"src": result[0].video})
  })


});



module.exports = router;
