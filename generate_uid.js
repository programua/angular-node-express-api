var express = require("express");
var uid = require("uid-safe");

var router = express.Router();

router.get('/', function(req, res, next){
  console.log("generate_uid.js");
  var strUid = uid.sync(18);
  res.json({guid: strUid});
});

module.exports = router;