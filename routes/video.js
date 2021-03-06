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

  videos = db.get("videos");
  includes = db.get("includes");
  seen = db.get("seen");

  includes.find({"channel": req.query.channel},function(err, result){
    console.log("Req query channel: " + req.query.channel);
    seen.find({"user": req.session.user}, function(err, result2){
      console.log(req.session.user);
      video_list = [];
      user_video = {};
      for(i = 0; i < result.length; i++){
        video_list.push(result[i].video);
        console.log("VIDEOLIST 1" + video_list);
      }
      for(i = 0; i<result2.length; i++){
        //console.log(result2[i].video);
        if(video_list.indexOf(result2[i].video != -1)){
          video_list.splice(video_list.indexOf(result2[i].video), 1)
        }
      }
      var hls_list = [];
      for (x in video_list){
        console.log("x is: " + video_list[x]);
        console.log("X" + x);
        if(video_list[x] != undefined){
          hls = video_list[x].split(".").splice(0)[0] + ".m3u8";
          hls_list.push(hls)
        }
      }
      console.log(hls_list);
      video_list = hls_list.concat(video_list);
      console.log("VIDEOLIST: " + video_list);

      for(i=0; i < video_list.length; ++i) {
        console.log("HEJSAN!");
        videos.find({path:i}, function(err,result){
          user_video[user] = result.user;
          console.log("USER VIDEO" + user_video);
        });
      }
      console.log("CONCATENATED: " + video_list);
      res.render("video", {"src": video_list});
    })
  })

});

router.post("/", function(req, res, next){
  seen = db.get("seen");
  seen.insert({"user":req.session.user, "video": req.body.video })
  res.render("video");
})

module.exports = router;
