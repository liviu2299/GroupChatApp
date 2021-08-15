import React, { useContext } from 'react'

import { UserContext } from '../../context/UserContext'

import './Message.css'

export default function Message({message}) {

    const { me } = useContext(UserContext)

    return (
        <div>
            {
                me === message.user ? (
                    <div className="messageContainer justifyEnd">
                        <p className="sentText pr-10">{me}</p>
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
                        <p className="sentText"> {message.user}</p>
                    </div>
                )
            }
        </div>
    )
}
