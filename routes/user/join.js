var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var db_init = require(appRoot +'/db/db_init');
var sha256 = require('sha256');
//console.log(db_init.authenticate("simon wallin","sw0049sw"));
var bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user){
    res.redirect("/secret");
  }else{
    res.render('join');
  }
});

router.post("/", function(req,res,next){
  if(req.body.admin){
    admin = true;
  }else{
    admin=false;
  }
  db_init.users.insert({username:req.body.username, password:sha256(req.body.psw), email:req.body.email, admin: admin}, function(){
    if(admin){
      res.redirect("/admin");
    }else{
      res.redirect("/login");
    }

  });
});



module.exports = router;
