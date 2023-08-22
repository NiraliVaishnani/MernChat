import React, { useState } from 'react'
import { BsArrowRight } from 'react-icons/bs';
import '../../style/chatcontact.css'
import '../../style/chatarea.css'
const Chatarea = (props) => {
    const { selectedContact, ws } = props;
    const [message, setMessage] = useState('');
    const [allmessages, setAllmessages] = useState([]);
    const [updatedAllMessages, setUpdatedAllmessages] = useState([]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);

    };


    // const handleSendMessage = () => {
    //     ws.send(JSON.stringify({

    //         recipient: selectedContact,
    //         text: message

    //     }))
    //     // // Implement sending the message logic here
    //     // console.log('Sending message:', message);
    //     const newMessage = { text: message };
    //     console.log('New message:', newMessage);
    //     setAllmessages(prev => ([...prev, newMessage])); //
    //     // Log the updated messages
    //     console.log('Updated messages:', [...allmessages, newMessage]);

    //     console.log('Sending message:', allmessages);
    //     const messagetext = allmessages.map(message => message.text); //
    //     const lastest_message = messagetext[messagetext.length - 1]
    //     console.log('Sending message2222:', lastest_message);
    //     setx(lastest_message)
    //     setMessage('');
    // };



    const handleSendMessage = () => {
        ws.send(JSON.stringify({
            recipient: selectedContact,
            text: message
        }));

        const newMessage = { text: message };
        setAllmessages(prev => ([...prev, { text: newMessage, isOur: true }]));
        const messagetext = [...allmessages, newMessage].map(message => message.text);
        console.log("werty", [...allmessages, newMessage])
        console.log("Messagetext", messagetext);
        setUpdatedAllmessages([...allmessages, newMessage])
        const lastest_message = messagetext[messagetext.length - 1];

        setMessage('');
        console.log("Allmessages", allmessages);
    };
    console.log("werty222", updatedAllMessages) //

    return (
        // <div>
        //     {selectedContact ? <p> Messages selected by {selectedContact}</p> : <p>No selected person</p>}
        // </div>

        <>

            {selectedContact && (<>
                <div className="chatarea-header">

                    {updatedAllMessages.map((message2, index) => (
                        <li key={index}>{message2.text}</li>
                    ))}

                    {/* <p>Messages selected by {selectedContact}</p> */}

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
            </>)}
            {!selectedContact && <p>No selected contact</p>}

        </>
    )
}

export default Chatarea
