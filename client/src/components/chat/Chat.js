import React, { useState, useEffect, useContext } from 'react'

import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';

import Input from './Input';
import Messages from './Messages';

import './Chat.css'


export default function Chat() {

    const [message, setMessage] = useState('');

    const { me } = useContext(UserContext);
    const { messages, setMessages, socket } = useContext(SocketContext);

    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/')+1);

    function sendMessage(event) {
        event.preventDefault();
        
        socket.emit('send message', {user: me, text: message});

        setMessage('');
        setMessages((prevMessages) => {
            return prevMessages.concat({user: me, text: message});
        });
    }

    return (
        <div>
            <Messages />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
}
