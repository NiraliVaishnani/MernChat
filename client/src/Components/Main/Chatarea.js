// import React, { useEffect, useState } from 'react'
// import { BsArrowRight } from 'react-icons/bs';
// import '../../style/chatcontact.css'
// import '../../style/chatarea.css'
// const Chatarea = (props) => {
//     const { selectedContact, ws } = props;
//     const [message, setMessage] = useState('');
//     const [allmessages, setAllmessages] = useState([]);
//     const [updatedAllMessages, setUpdatedAllmessages] = useState([]);

//     const handleMessageChange = (event) => {
//         setMessage(event.target.value);

//     };

//     useEffect(() => {
//         // This code will run whenever updatedAllMessages changes
//         console.log("rety", updatedAllMessages);
//         const latestMessageText2 = updatedAllMessages[updatedAllMessages.length - 1];
//         console.log("latestMessageText2", latestMessageText2);
//         //const messagetext2 = latestMessageText2.text5;
//         //console.log("rutye", messagetext2);
//     }, [updatedAllMessages]);

//     // const handleSendMessage = () => {
//     //     ws.send(JSON.stringify({

//     //         recipient: selectedContact,
//     //         text: message

//     //     }))
//     //     // // Implement sending the message logic here
//     //     // console.log('Sending message:', message);
//     //     const newMessage = { text: message };
//     //     console.log('New message:', newMessage);
//     //     setAllmessages(prev => ([...prev, newMessage])); //
//     //     // Log the updated messages
//     //     console.log('Updated messages:', [...allmessages, newMessage]);

//     //     console.log('Sending message:', allmessages);
//     //     const messagetext = allmessages.map(message => message.text); //
//     //     const lastest_message = messagetext[messagetext.length - 1]
//     //     console.log('Sending message2222:', lastest_message);
//     //     setx(lastest_message)
//     //     setMessage('');
//     // };



//     const handleSendMessage = () => {
//         ws.send(JSON.stringify({
//             recipient: selectedContact,
//             text: message
//         }));

//         const newMessage = { text: message };
//         setAllmessages(prev => ([...prev, { text5: newMessage, isOur: true }]));
//         const latestMessageText = allmessages[allmessages.length - 1];

//         console.log("Messagetext", latestMessageText); // Output: "Hello, this is a new message."
//         //const messagetext = latestMessageText.text5;
//         // console.log("rutye", messagetext);
//         //const messagetext = [...allmessages, newMessage].map(message => message.text);
//         //console.log("werty", [...allmessages, newMessage])
//         // console.log("Messagetext", messagetext);
//         // setUpdatedAllmessages([...allmessages, newMessage])
//         console.log("werty", [...allmessages, newMessage])
//         const xy = [...allmessages, newMessage]
//         console.log("xy", xy)
//         //  setUpdatedAllmessages([...allmessages, { text5: newMessage, isOur: true }])
//         setUpdatedAllmessages([...xy, { text5: newMessage, isOur: true }])
//         console.log("rety", updatedAllMessages)
//         const latestMessageText2 = updatedAllMessages[updatedAllMessages.length - 1];
//         console.log("latestMessageText2", latestMessageText2);
//         //  const messagetext2 = latestMessageText2.text5;
//         // console.log("rutye", messagetext2);

//         setMessage('');
//         console.log("Allmessages", allmessages);
//     };
//     console.log("werty222", updatedAllMessages) //

//     return (
//         // <div>
//         //     {selectedContact ? <p> Messages selected by {selectedContact}</p> : <p>No selected person</p>}
//         // </div>

//         <>

//             {selectedContact && (<>
//                 <div className="chatarea-header">

//                     {updatedAllMessages.map((message2, index) => (
//                         <li key={index}>{message2.text}</li>
//                     ))}

//                     {/* <p>Messages selected by {selectedContact}</p> */}

//                 </div>

//                 <div className="message-box">
//                     <input
//                         type="text"
//                         placeholder="Type your message..."
//                         value={message}
//                         onChange={handleMessageChange}
//                     />
//                     <button onClick={handleSendMessage}>
//                         <BsArrowRight />
//                     </button>
//                 </div>
//             </>)}
//             {!selectedContact && <p>No selected contact</p>}

//         </>
//     )
// }

// export default Chatarea



import React, { useEffect, useState } from 'react';
import { BsArrowRight } from 'react-icons/bs';
import '../../style/chatcontact.css';
import '../../style/chatarea.css';
import uniqBy from 'lodash/uniqBy'; // Import uniqBy from lodash

const Chatarea = (props) => {
    const { selectedContact, ws, messages, userId } = props;
    const [message, setMessage] = useState('');
    const [allmessages, setAllmessages] = useState([]);
    const [updatedAllMessages, setUpdatedAllmessages] = useState([]);
    // This useEffect runs whenever updatedAllMessages changes
    useEffect(() => {
        console.log("Updated all messages:", updatedAllMessages);
        // You can perform additional actions based on updatedAllMessages here
    }, [updatedAllMessages]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        ws.send(JSON.stringify({
            recipient: selectedContact,
            text: message
        }));

        const newMessage = { text: message };
        setAllmessages(prev => [...prev, { text5: newMessage, isOur: true }]);
        setUpdatedAllmessages(prev => [...prev, { text5: newMessage, isOur: true }]);
        console.log("newMessage", updatedAllMessages);

        setMessage('');
    };
    const messageswithoutDupes = uniqBy(messages, 'id');
    const { id, sender } = messageswithoutDupes
    console.log("messageswithoutDupes", messageswithoutDupes);

    return (
        <>
            {selectedContact && (
                <>
                    <div className="chatarea-header">
                        {/* sender: {messageswithoutDupes.map((message2, index) => (
                            <li key={index}>{message2.sender}</li>
                        ))} */}

                        sender2:<ul>
                            {messageswithoutDupes.map((message2, index) => (
                                <li
                                    key={index}
                                    className={message2.sender ? 'sender-message' : 'reciever-message'}
                                //className='sender-message'
                                >
                                    Hyy: {sender}
                                    Hello:  {message2.sender}
                                </li>
                            ))}
                        </ul>

                        recipient: {messageswithoutDupes.map((message2, index) => (
                            <li key={index}>{message2.text.recipient}</li>
                        ))}
                        {updatedAllMessages.map((message2, index) => (
                            <li key={index}>{message2.text5.text}</li>
                        ))}

                        {messageswithoutDupes.map((message2, index) => (
                            <li key={index}>{message2.text.text}</li>
                        ))}


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
