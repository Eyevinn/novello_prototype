var express = require('express');
var router = express.Router();
var appRoot = require('app-root-path');
var db_init = require(appRoot +'/db/db_init');
var sha256 = require('sha256');
//console.log(db_init.authenticate("simon wallin","sw0049sw"));
var bodyParser = require('body-parser');
/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user && req.session.admin){
    res.locals.user = req.session.user;
    
    res.render("admin");
  }else{
    res.send('Danger danger, authentication failed. Selfdestruct commencing');
  }

});

router.post("/", function(req, res){

})

module.exports = router;
