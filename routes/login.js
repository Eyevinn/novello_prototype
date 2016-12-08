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

  var _username = req.body.username;
  var _password = sha256(req.body.password);
  var users = db_init.db.collection("users");
  console.log(_username);
  console.log(_password);
  users.findOne({username:_username},function(e, result){
    console.log(result);
    if (e){
      console.log("e");
      res.render("login", {message: "Inloggningen misslyckades"});
    }
    if(result.password == _password){
      console.log("correct");
      req.session.user=_username;
      res.redirect("/secret");
    }else{
      res.render("login", {message: "Inloggningen misslyckades"});
    }
  })
})

module.exports = router;
