import { useState, useContext } from 'react'

import { SocketContext } from '../../context/SocketContext';
import { UserContext } from '../../context/UserContext';

import Input from './Input';
import Messages from './Messages';

import './Chat.css'

export default function Chat() {

    const [message, setMessage] = useState('');

    const { myName } = useContext(UserContext);
    const { setMessages, socket } = useContext(SocketContext);

    function sendMessage(event) {
        event.preventDefault();
        
        if(message !== ''){
            socket.emit('send message', {id: socket.id ,user: myName, text: message});

            setMessage('');
            setMessages((prevMessages) => {
                return prevMessages.concat({id: socket.id, user: myName, text: message});
            });
        }  
    }

    return (
        <div className="container">
            <Messages />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
}
