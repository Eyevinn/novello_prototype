var express = require('express');
var router = express.Router();

/*  GET TEST CHANNEL PAGE */
router.get('/', function(req, res) {
    var db = req.db_init;
    console.log("*********************************** DB: " + db);
    res.render('test', { title: 'Test' });
});



module.exports = router;
