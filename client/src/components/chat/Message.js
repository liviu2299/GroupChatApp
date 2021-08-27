import React, { useContext } from 'react'

import { UserContext } from '../../context/UserContext'
import { SocketContext } from '../../context/SocketContext';

import './Message.css'

export default function Message({message}) {

    const { myName } = useContext(UserContext);
    const { socket } = useContext(SocketContext);

    return (
        <div>
            {
                message.id === 'bot' ?
                (
                    <div className="messageContainer justifyCenter">
                        <div className="botMessageBox backgroundGray">
                            <p className="botMessageText">{message.text}</p>
                        </div>
                    </div>   
                ) :[
                    socket.id === message.id ? (
                        <div className="messageContainer justifyEnd">
                            <p className="sentText1">{myName}</p>
                            <div className="messageBox backgroundBlue">
                                <p className="messageText">{message.text}</p>
                            </div>
                        </div>
                    )
                    : (
                        <div className="messageContainer justifyStart">
                            <div className="messageBox backgroundLight">
                                <p className="messageText colorDark">{message.text}</p>
                            </div>
                            <p className="sentText2"> {message.user}</p>
                        </div>
                    )
                ]
            }
        </div>
    )
}
