const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/register')

router.get("/allusers", registerControllers.getUsers)
router.post("/register", registerControllers.userregistration)
router.post("/login", registerControllers.userlogin)

module.exports = router;