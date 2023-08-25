import React, { useEffect, useState } from "react";
import "../../style/chat.css";
import ContactList from "./ContactList";
import Chatarea from "./Chatarea";

const Chat = () => {
    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        const parsedUserInfo = JSON.parse(storedUserInfo);

        if (parsedUserInfo.token) {
            const ws = setupWebSocket(parsedUserInfo, handMessage);
            setWs(ws);

            return () => {
                if (ws) {
                    ws.close();
                }
            };
        }
    }, []);

    useEffect(() => {
        console.log("Updated Messages:", messages);
    }, [messages]);

    function setupWebSocket(parsedUserInfo, handMessage) {
        const token = parsedUserInfo.token;
        if (token) {
            const ws = new WebSocket("ws://localhost:5000", [
                "logintoken",
                token,
                "userId",
                parsedUserInfo.userId,
                "username",
                parsedUserInfo.username,
            ]);
            ws.addEventListener("message", handMessage);
            return ws;
        }
        return null;
    }

    function handMessage(e) {
        const messageData = JSON.parse(e.data);
        if ('online' in messageData) {
            const onlinePeopleArray = messageData.online;
            setOnlinePeople(onlinePeopleArray);
            console.log("OnlinePeople", onlinePeopleArray);
        } else if ('text' in messageData) {
            const { id, sender, text } = messageData;
            setMessages((prevMessages) => [
                ...prevMessages,
                { id, sender, isOur: false, text: messageData },
            ]);
            console.log("Updated Messages:", messages);
        }
    }

    const getData = (data) => {
        setSelectedContact(data);
    };

    return (
        <div className="chat-container">
            <div className="contact-list">
                <ContactList
                    onlinePeople={onlinePeople}
                    userId={parsedUserInfo.userId}
                    getData2={getData}
                />
            </div>
            <div className="chat-area">
                <Chatarea
                    selectedContact={selectedContact}
                    ws={ws}
                    messages={messages}
                    userId={parsedUserInfo.userId}
                />
            </div>
        </div>
    );
};

export default Chat;
