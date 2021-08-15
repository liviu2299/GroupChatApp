import React, { useContext } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

import Message from './Message';

import { SocketContext } from '../../context/SocketContext';

import './Messages.css'

export default function Messages() {

    const { messages } = useContext(SocketContext);

    return (
        <ScrollToBottom>
            {messages.map((message, i) => {
                return(
                    <div key={i}>
                            <Message message={message}/>                      
                    </div>
                )
            })}
        </ScrollToBottom>
    )
}
