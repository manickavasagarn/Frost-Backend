const express = require("express");
const router = express.Router();


var UserModule = require("../modules/UserModule");


router.get("/myDetail", UserModule.myDetail);
router.put("/update", UserModule.update);

module.exports = router;
