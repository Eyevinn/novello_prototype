var express = require('express');
var router = express.Router();
var db_init = require('../db/db_init');
var sha256 = require('sha256');
//console.log(db_init.authenticate("simon wallin","sw0049sw"));
var bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  var auto_login = true;
  if(auto_login){
    req.session.user = "simon wallin"; // added during dev in order to be able to skip login.
    req.session.admin = true;
  }
  if(req.session.user){
    res.redirect("/secret");
  }else{
    res.render('login');
  }

});

router.post("/", function(req, res){

  var _username = req.body.username;
  var _password = sha256(req.body.password);
  var users = db_init.db.collection("users");

  users.findOne({username:_username},function(e, result){

    if (e){
      console.log("e");
      res.render("login", {message: "Inloggningen misslyckades"});
    }
    if(result.password == _password){
      console.log("correct");
      req.session.user=_username;
      req.session.admin=result.admin;
      res.redirect("/secret");
    }else{
      res.render("login", {message: "Inloggningen misslyckades"});
    }
  })
})

module.exports = router;
