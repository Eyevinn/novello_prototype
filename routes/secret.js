var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.user){
      res.locals.user = req.session.user;
      res.locals.online = true;
      
      res.render('secret',{"admin": req.session.admin});
  }else{
    res.redirect("/");
  }

});

module.exports = router;
