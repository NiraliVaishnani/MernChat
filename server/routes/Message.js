const express = require('express');
const router = express.Router();
const messageControllers = require('../controllers/Message')

router.get("/allmessages", messageControllers.getMessages)
router.post("/createmessage", messageControllers.createMessage)
router.post("/send-message", messageControllers.sendMessage);
router.get("/allmessage/:senderId", messageControllers.getMessagesBySenderId)

module.exports = router;