const express = require("express");
const router = express.Router();


var AuthenticationModule = require("../modules/AuthenticationModule");


router.post("/api/auth", AuthenticationModule.auth);
// Sign up
router.post("/api/register", AuthenticationModule.register);



module.exports = router;
