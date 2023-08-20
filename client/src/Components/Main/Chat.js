import React, { useEffect, useState } from "react";
import "../../style/chat.css";
import ContactList from "./ContactList";
import Chatarea from "./Chatarea";
const Chat = () => {
  const [ws, setws] = useState(null);
  //   useEffect(() => {
  //     const token = localStorage.getItem("logintoken");
  //     console.log("tOKEN", token);
  //     const ws = new WebSocket("ws://localhost:5000");
  //     setws(ws);
  //     ws.addEventListener("message", handMessage);
  //     function handMessage(e) {
  //       console.log("new message", e);
  //     }
  //   }, []);
  useEffect(() => {
    const token = localStorage.getItem("logintoken");
    console.log("tOKEN", token);
    if (token) {
      const ws = new WebSocket("ws://localhost:5000", ["logintoken", token]);
      setws(ws);
      ws.addEventListener("message", handMessage);
    }
    // Clean up WebSocket when the component unmounts
    return () => {
      if (ws) {
        ws.close();
      }
    };

    function handMessage(e) {
      console.log("new message", e);
    }
  }, []);
  return (
    <div className="chat-container">
      <div className="contact-list">
        <ContactList />
      </div>
      <div className="chat-area">
        <Chatarea />
      </div>
    </div>
  );
};

export default Chat;
