var express = require('express');
var router = express.Router();



var db_init = require('../db/db_init');

var sha256 = require('sha256');
//console.log(db_init.authenticate("simon wallin","sw0049sw"));

var bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post("/", function(req, res){
  //handle login info
  var _username = req.body.username;
  var _password = sha256(req.body.password);
  var users = db_init.db.collection("users");
  users.findOne({username:_username},function(e, result){
    if (e){
    res.render("login");
    }
    if(result.password == _password){
      console.log("success");
      res.render("login");
    }else{
      res.render("login");
    }

  })


})

module.exports = router;
