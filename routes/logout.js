var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session);
  req.session.user= null;
  console.log(req.session);
  res.redirect('/');
});



module.exports = router;
