var express = require('express');
var router = express.Router();

/* GET CHANNELLIST PAGE */
router.get('/channellist', function(req, res) {
    var db = req.db;
    var channels = db.get('Channels');

    channels.find({},{},function(e,docs){
        res.render('channellist', {
            "channellist" : docs
        });
    });
});

module.exports = router;
