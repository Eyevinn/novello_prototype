var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log(req.session);
  if(req.session.user){
      if(req.session.admin == true){
        res.render('secret', {admin: true});
      }else{
        
      }

  }else{
    res.redirect("/");
  }

});




module.exports = router;
