import React, { useEffect, useState } from "react";
import "../../style/chat.css";
import ContactList from "./ContactList";
import Chatarea from "./Chatarea";
const Chat = () => {
  const [ws, setws] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUserName] = useState('')

  useEffect(() => {
    // const token = localStorage.getItem("logintoken");
    // console.log("tOKEN", token);


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
      // console.log(peopleArray.username)
      // console.log(peopleArray.userId)
      //  console.log(userId, username)
      peopleArray.forEach(({ userId, username }) => {
        console.log(username)
        setUserName(username);
        console.log(userId)
        setUserId(userId);
        people[userId] = username;
      })
      setOnlinePeople(people);
      console.log("People", people);
    }


    function handMessage(e) {
      const messageData = JSON.parse(e.data);
      console.log(messageData);
      if ('online' in messageData) {
        showOnlinePeople(messageData.online);
      }

    }
  }, []);
  console.log("Onlinepeople", onlinePeople);
  //const onlinePeopleExclOurUser = onlinePeople.filter(p => p.username !== username);
  //console.log(onlinePeopleExclOurUser)
  return (
    <div className="chat-container">
      <div className="contact-list">
        <ContactList onlinePeople={onlinePeople} setOnlinePeople={setOnlinePeople} userId={userId} />
      </div>
      <div className="chat-area">
        <Chatarea />
      </div>
    </div>
  );
};

export default Chat;
