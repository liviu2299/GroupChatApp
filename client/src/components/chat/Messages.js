import React, { useContext } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import ScrollableFeed from 'react-scrollable-feed'

import Message from './Message';

import { SocketContext } from '../../context/SocketContext';

import './Messages.css'

export default function Messages() {

    const { messages } = useContext(SocketContext);

    return (
        <ScrollableFeed>
            {messages.map((message, i) => 
                <div key={i}>
                        <Message message={message}/>                      
                </div>
                )
            }
        </ScrollableFeed>
    );
}
