var express = require('express');
var router = express.Router();
var AdminModule = require('../modules/AdminModule')
const jwt = require("jsonwebtoken");
const isAdmin = function (req, res, next) {
    try {
      let decoded = jwt.verify(req.headers.authtoken, process.env.SECRET_KEY);
      if (decoded.admin == "Yes") next();
      else throw new Error("401 Unauthorized");
    } catch (err) {
      res.sendStatus(401);
    }
};

router.get('/allUsers',isAdmin,AdminModule.users)
router.get('/waitingUpdate',isAdmin,AdminModule.waitingUpdate)
router.post('/acceptUpdate',isAdmin,AdminModule.acceptUpdate)
router.post('/rejectionUpdate',isAdmin,AdminModule.rejectionUpdate)
router.post('/userCreation',isAdmin,AdminModule.userCreation)

module.exports = router;