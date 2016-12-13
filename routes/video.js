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
  //console.log(req.query);
  includes = db.get("includes");
  seen = db.get("seen");
  includes.find({"channel": req.query.channel},function(err, result){
    seen.find({"user": req.session.user}, function(err, result2){
      video_list = [];
      for(i = 0; i < result.length; i++){
        for(x=0; x<result2.length; x++){

          if(result[i].video == result2[x].video){
            console.log("same");
          }else{
            video_list.push(result[i].video);
          }
        }

        //includes_list.push(result[i].video);
      }

      console.log(video_list);
      res.render("video", {"src": video_list})
      //console.log(result.toArray());
      //console.log(result2.toArray());
    })

  })
});

router.post("/", function(req, res, next){
  seen = db.get("seen");
  //seen.insert({"user":req.session.user, "video": req.body.video })
})


module.exports = router;
