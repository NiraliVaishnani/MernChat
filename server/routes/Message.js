const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/Message')

router.get("/allmessages", messageControllers.getMessages)
router.post("/createmessage", messageControllers.createMessage)

module.exports = router;