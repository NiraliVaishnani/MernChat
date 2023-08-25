// import React, { useEffect, useState } from "react";
// import "../../style/chat.css";
// import ContactList from "./ContactList";
// import Chatarea from "./Chatarea";
// const Chat = () => {
//   const [ws, setws] = useState(null);
//   const [onlinePeople, setOnlinePeople] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [username, setUserName] = useState('')
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);



//   useEffect(() => {
//     var storedUserInfo = localStorage.getItem("userInfo");
//     var parsedUserInfo = JSON.parse(storedUserInfo);

//     // Access the token property
//     var token = parsedUserInfo.token;
//     if (token) {
//       const ws = new WebSocket("ws://localhost:5000", ["logintoken", token, "userId", parsedUserInfo.userId, "username", parsedUserInfo.username]);
//       setws(ws);
//       ws.addEventListener("message", handMessage);
//     }
//     // Clean up WebSocket when the component unmounts
//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };


//     function showOnlinePeople(peopleArray) {
//       const people = {};
//       peopleArray.forEach(({ userId, username }) => {
//         setUserName(username);
//         setUserId(userId);
//         people[userId] = username;
//       })
//       setOnlinePeople(people);

//     }


//     function handMessage(e) {
//       console.log("ssafkhsafgsjfsfgjfgf")
//       const messageData = JSON.parse(e.data);
//       console.log({ e, messageData });
//       if ('online' in messageData) {
//         showOnlinePeople(messageData.online);
//         console.log("OnlinePeople", onlinePeople)
//       }
//       else if ('text' in messageData) {
//         const { id, sender, text } = messageData;
//         //setMessages(prev => ([...prev, { isOur: false, text: messageData }]))
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { id, sender, isOur: false, text: messageData },
//         ]);
//         console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", messages)
//       }
//     }
//   }, []);

//   useEffect(() => {
//     // When messages change, you can do any relevant updates here
//     console.log("Updated Messages:", messages);
//   }, [messages]);
//   // console.log("Onlinepeople", onlinePeople);

//   const getData = (data) => {
//     console.log("getData", data);
//     setSelectedContact(data);
//     console.log("SelectedContact", selectedContact);
//   };

//   return (
//     <div className="chat-container">
//       <div className="contact-list">
//         <ContactList onlinePeople={onlinePeople} setOnlinePeople={setOnlinePeople} userId={userId} getData2={getData} />
//       </div>
//       <div className="chat-area"  >
//         <Chatarea selectedContact={selectedContact} ws={ws} messages={messages} userId={userId} />
//       </div>
//     </div>
//   );
// };

// export default Chat;



// import React, { useEffect, useState } from "react";
// import "../../style/chat.css";
// import ContactList from "./ContactList";
// import Chatarea from "./Chatarea";
// const Chat = () => {
//   const [ws, setws] = useState(null);
//   const [onlinePeople, setOnlinePeople] = useState([]);
//   const [userId, setUserId] = useState("");
//   const [username, setUserName] = useState('')
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [messages, setMessages] = useState([]);


//   useEffect(() => {
//     var storedUserInfo = localStorage.getItem("userInfo");
//     var parsedUserInfo = JSON.parse(storedUserInfo);
//     const ws = setupWebSocket(parsedUserInfo, handMessage);
//     // // Access the token property
//     // var token = parsedUserInfo.token;
//     // if (token) {
//     //   const ws = new WebSocket("ws://localhost:5000", ["logintoken", token, "userId", parsedUserInfo.userId, "username", parsedUserInfo.username]);
//     //   setws(ws);
//     //   ws.addEventListener("message", handMessage);
//     // }
//     // // Clean up WebSocket when the component unmounts
//     return () => {
//       if (ws) {
//         ws.close();
//       }
//     };


//     function showOnlinePeople(peopleArray) {
//       const people = {};
//       peopleArray.forEach(({ userId, username }) => {
//         setUserName(username);
//         setUserId(userId);
//         people[userId] = username;
//       })
//       setOnlinePeople(people);

//     }


//     function handMessage(e) {

//       const messageData = JSON.parse(e.data);
//       console.log({ e, messageData });
//       if ('online' in messageData) {
//         showOnlinePeople(messageData.online);
//         console.log("OnlinePeople", onlinePeople)
//       }
//       else if ('text' in messageData) {
//         const { id, sender, text } = messageData;
//         //setMessages(prev => ([...prev, { isOur: false, text: messageData }]))
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { id, sender, isOur: false, text: messageData },
//         ]);
//         console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", messages)
//       }
//     }
//   }, []);

//   function setupWebSocket(parsedUserInfo, handMessage) {
//     const token = parsedUserInfo.token;
//     if (token) {
//       const ws = new WebSocket("ws://localhost:5000", [
//         "logintoken",
//         token,
//         "userId",
//         parsedUserInfo.userId,
//         "username",
//         parsedUserInfo.username,
//       ]);
//       setws(ws);
//       ws.addEventListener("message", handMessage);

//       //return ws;
//     }
//     return null;
//   }
//   useEffect(() => {
//     // When messages change, you can do any relevant updates here
//     console.log("Updated Messages:", messages);
//   }, [messages]);
//   // console.log("Onlinepeople", onlinePeople);

//   const getData = (data) => {
//     console.log("getData", data);
//     setSelectedContact(data);
//     console.log("SelectedContact", selectedContact);
//   };

//   return (
//     <div className="chat-container">
//       <div className="contact-list">
//         <ContactList onlinePeople={onlinePeople} setOnlinePeople={setOnlinePeople} userId={userId} getData2={getData} />
//       </div>
//       <div className="chat-area"  >
//         <Chatarea selectedContact={selectedContact} ws={ws} messages={messages} userId={userId} />
//       </div>
//     </div>
//   );
// };

// export default Chat;






import React, { useEffect, useState } from "react";
import "../../style/chat.css";
import ContactList from "./ContactList";
import Chatarea from "./Chatarea";
import { useParams } from 'react-router-dom';
import axios from "axios"; // Import axios
const Chat = () => {


  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(storedUserInfo);

    setUserId(parsedUserInfo.userId);
    setUsername(parsedUserInfo.username);

    const ws = setupWebSocket(parsedUserInfo, handMessage);
    setWs(ws);

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);
  const fetchOnlinePeople = async () => {
    try {
      const response = await axios.get("http://localhost:5000/account/online-people");
      return response.data; // Return the fetched data from the response
    } catch (error) {
      console.error("Error fetching online people:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchOnlinePeople().then(data => {
      setOnlinePeople(data); // Update the onlinePeople state
      console.log("OnlinePeople", data); // Updated onlinePeople
    });
  }, []);



  const sendMessage = async (recipientId, text) => {
    const data = { senderId: userId, recipientId, text }; // Include the senderId and recipientId
    try {
      const response = await fetch("http://localhost:5000/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Message sent successfully, handle response if needed
      } else {
        // Handle error response
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


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
  useEffect(() => {
    console.log("OnlinePeople updated:", onlinePeople);
  }, [onlinePeople]);
  const handMessage = async (e) => {
    const messageData = JSON.parse(e.data);
    if ('online' in messageData) {
      const onlinePeopleData = await fetchOnlinePeople();
      setOnlinePeople(onlinePeopleData);
      console.log("OnlinePeople", onlinePeopleData); // Updated onlinePeople

    } else if ('text' in messageData) {
      // const { id, sender, text } = messageData;
      // setMessages((prevMessages) => [
      //   ...prevMessages,
      //   { id, sender, isOur: false, text: messageData },
      // ]);
      // console.log("Updated Messages:", messages);
      // const messages = sendMessage();
      // console.log("Updated Messages:", messages);

      const { senderId, text } = messageData;

      try {
        const response = await axios.post("http://localhost:5000/createmessage", {
          senderId: senderId, // Use the senderId from the received message
          recipientId: userId, // Use the recipientId of the receiver
          text: text,
          file: null
        });

        const newMessage = response.data;
        setAllmessages([...allmessages, newMessage]);

      } catch (error) {
        console.error("Error creating message:", error);
      }
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
          userId={userId}
          getData2={getData}
        />
      </div>
      <div className="chat-area">
        <Chatarea
          selectedContact={selectedContact}
          ws={ws}
          messages={messages}
          userId={userId}
        />
      </div>
    </div>
  );
};

export default Chat;



