const express = require('express');
const router = express.Router();
const registerControllers = require('../controllers/register')

router.get("/allusers", registerControllers.getUsers)
router.post("/register", registerControllers.userregistration)
router.post("/login", registerControllers.userlogin)
router.get('/online-people', registerControllers.getOnlineUsers);



module.exports = router;