import React, { useState } from 'react'
import '../../style/chatcontact.css'
import { BsFillChatLeftFill } from 'react-icons/bs';
import Avatar from './Avatar';
const ContactList = (props) => {
    const { onlinePeople, setOnlinePeople, userId } = props;
    const [selectedUserId, setSelectedUserId] = useState(null);
    const selectContact = (userId) => {
        setSelectedUserId(userId)
        // if (selectedUserId) {
        //     background color should be blue
        // }

        // Check if the clicked contact is already selected
        if (userId === selectedUserId) {
            setSelectedUserId(null); // Deselect the contact
        } else {
            setSelectedUserId(userId); // Select the clicked contact
        }
    }
    // console.log("onlinePeople", onlinePeople)
    // console.log("onlinePeople[userId]", onlinePeople[userId]);
    return (
        <>
            {/* <div >Mernchat</div>
            <div>
                {Object.keys(onlinePeople).map(userId => (
                    <div key={userId}>
                        <h1>{onlinePeople[userId]}</h1>
                    </div>
                ))}
            </div> */}
            <div className="contact-list-container">
                <div className="contact-list-header">Mernchat <BsFillChatLeftFill className="chat-icon" /></div>
                <div className="online-people-list">
                    {Object.keys(onlinePeople).map(userId => (
                        <div key={userId} className={`online-person ${selectedUserId === userId ? 'bg-blue' : ''}`} onClick={() => selectContact(userId)}>
                            <div className="aavtar" ><Avatar username={onlinePeople[userId]} userId={userId} /></div>
                            {onlinePeople[userId]}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ContactList
