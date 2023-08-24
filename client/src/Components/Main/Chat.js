import React, { useEffect, useState } from "react";
import "../../style/chat.css";
import ContactList from "./ContactList";
import Chatarea from "./Chatarea";
const Chat = () => {
  const [ws, setws] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUserName] = useState('')
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    var storedUserInfo = localStorage.getItem("userInfo");
    var parsedUserInfo = JSON.parse(storedUserInfo);

    // Access the token property
    var token = parsedUserInfo.token;
    if (token) {
      const ws = new WebSocket("ws://localhost:5000", ["logintoken", token, "userId", parsedUserInfo.userId, "username", parsedUserInfo.username]);
      setws(ws);
      ws.addEventListener("message", handMessage);
    }
    // Clean up WebSocket when the component unmounts
    return () => {
      if (ws) {
        ws.close();
      }
    };
    function showOnlinePeople(peopleArray) {
      const people = {};
      peopleArray.forEach(({ userId, username }) => {
        setUserName(username);
        setUserId(userId);
        people[userId] = username;
      })
      setOnlinePeople(people);

    }


    function handMessage(e) {
      console.log("ssafkhsafgsjfsfgjfgf")
      const messageData = JSON.parse(e.data);
      console.log({ e, messageData });
      if ('online' in messageData) {
        showOnlinePeople(messageData.online);
        console.log(onlinePeople)
      }
      else if ('text' in messageData) {
        const { id, sender, text } = messageData;
        //setMessages(prev => ([...prev, { isOur: false, text: messageData }]))
        setMessages((prevMessages) => [
          ...prevMessages,
          { id, sender, isOur: false, text: messageData },
        ]);
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", messages)
      }
    }
  }, [messages]);

  useEffect(() => {
    // When messages change, you can do any relevant updates here
    console.log("Updated Messages:", messages);
  }, [messages]);
  // console.log("Onlinepeople", onlinePeople);

  const getData = (data) => {
    console.log("getData", data);
    setSelectedContact(data);
    console.log("SelectedContact", selectedContact);
  };

  return (
    <div className="chat-container">
      <div className="contact-list">
        <ContactList onlinePeople={onlinePeople} setOnlinePeople={setOnlinePeople} userId={userId} getData2={getData} />
      </div>
      <div className="chat-area"  >
        <Chatarea selectedContact={selectedContact} ws={ws} messages={messages} userId={userId} />
      </div>
    </div>
  );
};

export default Chat;
