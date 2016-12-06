var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/novello_prototype');
var sha256 = require('sha256');

var now = new Date();

var users = db.collection("users");
var videos = db.collection("videos");
var follows = db.collection("follows");
var seen = db.collection("seen");
var includes = db.collection("includes");
var channels = db.collection("channels");


function init_db(){
  users.insert({username:"simon wallin", password:sha256("sw0049sw"), email:"simon.wallin@eyevinn.se", admin: true});
  videos.insert({path:"/uploads/test.mp4", length:120, user:"simon wallin", time: now, });
  follows.insert({username: "simon wallin", channel: "news"});
  seen.insert({username:"simon wallin", video: "test"});
  includes.insert({video:"test", channel: "news"});
  channels.insert({channel:"General"});
};

function authenticate(user_username, user_password){
  users.findOne({username: user_username}, function(e, result){
    if(sha256(user_password) == result.password){
      return true;
    }else{
      return false;
    }
  })
};

authenticate("simon wallin", "sw0049sw");
