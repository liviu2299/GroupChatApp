import React from 'react'

import './Input.css'

export default function Input(props) {
    return (
        <form className="form">
            <input 
                className="input"
                type="text"
                value={props.message}
                placeholder="Send a message..."
                onChange={(event) => props.setMessage(event.target.value)}
                onKeyPress={event => event.key === 'Enter' ? props.sendMessage(event) : null}/>
            {/*<button className="sendButton" onClick={(event) => props.sendMessage(event)}>Send</button>*/}
        </form>
    )
}
