const express = require("express");
const app = express();
app.use(express.json());
const Message = require('../models/Message')

exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll();
        res.json(messages);
    } catch (err) {
        console.error(err);
    }
}

// exports.getMessageById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const messages = await Message.findByPk(id);
//         res.json(messages);
//     } catch (err) {
//         console.error(err);
//     }
// }

exports.getMessagesBySenderId = async (req, res) => {
    const { senderId } = req.params;
    try {
        const messages = await Message.findAll({
            where: { senderId: senderId },
        });
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.createMessage = async (req, res) => {
    const { senderId, recipientId, text, file } = req.body;
    try {
        const newMessage = await Message.create({ senderId, recipientId, text, file });
        res.json(newMessage);
    } catch (err) {
        console.log("Error:", err);
    }
}

exports.sendMessage = async (req, res) => {
    const { senderId, recipientId, text } = req.body;

    try {
        const newMessage = await Message.create({
            senderId,
            recipientId,
            text,
        });

        res.status(201).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}