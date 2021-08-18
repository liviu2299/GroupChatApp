import React, { useContext } from 'react'

import { UserContext } from '../../context/UserContext'

import './Message.css'

export default function Message({message}) {

    const { me } = useContext(UserContext)

    return (
        <div>
            {
                message.user === 'bot' ?
                (
                    <div className="messageContainer justifyCenter">
                        <div className="botMessageBox backgroundGray">
                            <p className="botMessageText">{message.text}</p>
                        </div>
                    </div>   
                ) :[
                    me === message.user ? (
                        <div className="messageContainer justifyEnd">
                            <p className="sentText1">{me}</p>
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
