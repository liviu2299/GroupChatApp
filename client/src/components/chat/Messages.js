import React, { useContext, useRef, useEffect } from 'react'

import Message from './Message';

import { SocketContext } from '../../context/SocketContext';

import './Messages.css'

export default function Messages() {

    const { messages } = useContext(SocketContext);
    const messagesEndRef = useRef();

    function scrollToBottom() {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <div className="messages">
            {messages.map((message, i) => 
                <div key={i}>
                        <Message message={message}/>                      
                </div>
                )
            }
            <div ref={messagesEndRef} />
        </div>
    );
}
