const express = require("express");
const app = express();
app.use(express.json());
const Message = require('../models/Message')

exports.getMessages = async (req, res) => { }
exports.createMessage = async (req, res) => {
    const { senderId, recipientId, text, file } = req.body;
    try {
        const newMessage = await Message.create({ senderId, recipientId, text, file });
        res.json(newMessage);
    } catch (err) {
        console.log("Error:", err);
    }



}