import React, { useState } from 'react'
import '../../style/chatcontact.css'
import { Link, useParams } from 'react-router-dom';
import { BsFillChatLeftFill } from 'react-icons/bs';
import Avatar from './Avatar';
const ContactList = (props) => {
    const { onlinePeople, setOnlinePeople, userId, getData2, fetchOnlinePeople } = props;
    const { id } = useParams();
    console.log("fetchOnlinePeople", onlinePeople)
    const [selectedUserId, setSelectedUserId] = useState(null);
    const selectContact = (userId) => {
        console.log("selectContact", userId)
        setSelectedUserId(userId)
        const selectcontact = userId;
        console.log(selectcontact);
        getData2(selectcontact)

        if (userId === selectedUserId) {
            setSelectedUserId(null); // Deselect the contact
        } else {
            setSelectedUserId(userId); // Select the clicked contact
        }
    }

    return (
        <>
            <div className="contact-list-container">
                <div className="contact-list-header">Mernchat <BsFillChatLeftFill className="chat-icon" /></div>
                <div className="online-people-list">
                    {onlinePeople.map((people, index) => (
                        <Link to={`/chat/${people.id}`}>
                            <div key={index} onClick={() => selectContact(people.id)} className={`online-person ${selectedUserId === people.id ? 'bg-blue' : ''}`} >
                                <div className="aavtar" ><Avatar username={people.username} userId={people.id} /></div>
                                {people.username}
                            </div>
                        </Link>
                    ))}



                </div>
            </div>
        </>
    )
}

export default ContactList
