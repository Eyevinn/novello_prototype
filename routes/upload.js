var express = require('express');
var router = express.Router();
var fs = require("fs");


router.post('/', function(req, res, next) {
  console.log(req.files);
  if(req.session.user){


    res.send("handle file");
  }else{
    res.send("no file");
  }
});
module.exports = router;
