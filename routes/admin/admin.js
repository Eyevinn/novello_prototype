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
    res.locals.online = true;
    db_init.channels.find({}, function(e, list){
      channels = list;
      db_init.users.find({}, function(e, list){
        users = list;
        res.render("admin",{"users":users, "channels": channels});
      });
    });

    console.log(res.locals.channels);

  }else{
    res.send('Danger danger, authentication failed. Selfdestruct commencing');
  }

});

router.post("/", function(req, res){

})

module.exports = router;
