// import React, { useEffect, useState } from 'react';
// import { BsArrowRight } from 'react-icons/bs';
// import '../../style/chatcontact.css';
// import '../../style/chatarea.css';
// import uniqBy from 'lodash/uniqBy'; // Import uniqBy from lodash

// const Chatarea = (props) => {
//     const { selectedContact, ws, messages, userId } = props;
//     const [message, setMessage] = useState('');
//     const [allmessages, setAllmessages] = useState([]);
//     const [updatedAllMessages, setUpdatedAllmessages] = useState([]);

//     useEffect(() => {
//         console.log("Updated all messages:", updatedAllMessages);
//     }, [updatedAllMessages]);

//     useEffect(() => {
//         console.log(" all messages:", allmessages);
//     }, [allmessages]);



//     const handleSendMessage = async () => {
//         ws.send(JSON.stringify({
//             recipient: selectedContact,
//             text: message
//         }));
//         //  const response = await axios.post();

//         const newMessage = { text: message };
//         setAllmessages(prev => [...prev, { text: newMessage, isOur: true }]);
//         setUpdatedAllmessages(prev => [...prev, { text: newMessage, isOur: true }]);
//         console.log("newMessage", updatedAllMessages);
//         console.log("prevMessage", allmessages);

//         setMessage('');
//     };


//     const handleMessageChange = (event) => {
//         setMessage(event.target.value);
//     };

//     // const handleSendMessage = () => {
//     //     ws.send(JSON.stringify({
//     //         recipient: selectedContact,
//     //         text: message
//     //     }));

//     //     const newMessage = { text: message };
//     //     setAllmessages(prev => [...prev, { text: newMessage, isOur: true }]);
//     //     setUpdatedAllmessages(prev => [...prev, { text: newMessage, isOur: true }]);
//     //     console.log("newMessage", updatedAllMessages);
//     //     console.log("prevMessage", allmessages);

//     //     setMessage('');
//     // };
//     const messageswithoutDupes = uniqBy(messages, 'id');
//     const { id, sender } = messageswithoutDupes
//     // console.log("messageswithoutDupes", messageswithoutDupes);

//     return (
//         <>
//             {selectedContact && (
//                 <>
//                     <div className="chatarea-header">
//                         {/* sender: {messageswithoutDupes.map((message2, index) => (
//                             <li key={index}>{message2.sender}</li>
//                         ))} */}

//                         Reciever:<ul>
//                             {messageswithoutDupes.map((message2, index) => (
//                                 <li
//                                     key={index}
//                                     className='reciever-message'
//                                 //className='sender-message'
//                                 >
//                                     Hyy: {sender}
//                                     Hello:  {message2.sender}
//                                 </li>
//                             ))}
//                         </ul>

//                         Sender:
//                         {updatedAllMessages.map((message2, index) => (
//                             <li key={index}>{message2.text.text}</li>
//                         ))}
//                     </div>

//                     <div className="message-box">
//                         <input
//                             type="text"
//                             placeholder="Type your message..."
//                             value={message}
//                             onChange={handleMessageChange}
//                         />
//                         <button onClick={handleSendMessage}>
//                             <BsArrowRight />
//                         </button>
//                     </div>
//                 </>
//             )}
//             {!selectedContact && <p>No selected contact</p>}
//         </>
//     );
// };

// export default Chatarea;


import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import '../../style/chatcontact.css';
import '../../style/chatarea.css';
import uniqBy from 'lodash/uniqBy'; // Import uniqBy from lodash
import { useParams } from 'react-router-dom';
import axios from "axios"; // Import axios

const Chatarea = (props) => {
    const { id } = useParams();
    console.log("Id3: ", id)
    const { selectedContact, ws, messages, userId } = props;
    const [message, setMessage] = useState('');
    const [allmessages, setAllmessages] = useState([]);
    const [updatedAllMessages, setUpdatedAllmessages] = useState([]);


    // useEffect(() => {
    //     console.log("Updated all messages:", updatedAllMessages);
    // }, [updatedAllMessages]);

    // useEffect(() => {
    //     console.log(" all messages:", allmessages);
    // }, [allmessages]);

    const fetchAllMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/allmessage/${id}`);
            const data = response.data; // Return the fetched data from the response
            console.log("Data", data);
            setAllmessages("Data2", data)
            // setMessage(data)
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    };

    useEffect(() => {

        fetchAllMessages()
    }, [])


    const createMessage = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/createmessage`);
            const data = response.data; // Return the fetched data from the response
            console.log("Data", data);
            //  setMessage(data)
        } catch (error) {
            console.error("Error fetching messages:", error);
            return [];
        }
    }

    const handleSendMessage = async () => {
        if (message) {
            ws.send(JSON.stringify({
                recipient: id,
                text: message
            }))
        }

        try {
            const response = await axios.post("http://localhost:5000/createmessage", {
                senderId: props.userId,
                recipientId: id,
                text: message,
                file: null
            });

            // Assuming the response contains the newly created message
            const newMessage = response.data;
            console.log("newMessage", newMessage);
            // // Update state with the new message
            setAllmessages([...messages, newMessage]);

            setMessage(""); // Clear the input after sending

        } catch (error) {
            console.error("Error creating message:", error);
        }


    }
    console.log("Message", message)

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };


    const messageswithoutDupes = uniqBy(messages, 'id');



    return (
        <>
            {selectedContact && (
                <>
                    <div className="chatarea-header">

                    </div>

                    <div className="message-box">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={message}
                            onChange={handleMessageChange}
                        />
                        <button onClick={handleSendMessage}>
                            <BsArrowRight />
                        </button>
                    </div>
                </>
            )}
            {!selectedContact && <p>No selected contact</p>}
        </>
    );
};

export default Chatarea;
