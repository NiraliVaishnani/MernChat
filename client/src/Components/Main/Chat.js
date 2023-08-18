import React from 'react'
import '../../style/chat.css'
import ContactList from './ContactList'
import Chatarea from './Chatarea'
const Chat = () => {
    return (
        <div className="chat-container">
            <div className="contact-list">
                <ContactList />
            </div>
            <div className="chat-area">
                <Chatarea />
            </div>
        </div>
    )
}

export default Chat
