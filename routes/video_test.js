var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var db_init = require(appRoot +'/db/db_init');
var fs = require("fs");
var util = require("util");
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello');

//console.log(db_init.authenticate("simon wallin","sw0049sw"));
var bodyParser = require('body-parser');
/* GET home page. */

//Array.prototype.indexOf = function(val) {
//  for (var i=0; i<this.length; i++) {
//    if (this[i] == val) return i;
//  }
//  return -1;
//};

router.get('/', function(req, res, next){
  //console.log(req.query);
  res.render("video_test")
});



module.exports = router;
