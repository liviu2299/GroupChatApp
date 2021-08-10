import React, { useState, useRef, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export default function RoomForm(props) {

    const [input, setInput] = useState()

    const submitHandler = () => {
        props.setName(input);
        console.log('yey');
        props.socket.emit('join room', props.roomID, input);
    }

    useEffect(() => {
        console.log(input);
    }, [input])

    return (
        <div>
            <TextField 
                label="Name"
                variant="outlined"
                required
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <div>
                <Button type="submit" variant="contained" onClick={submitHandler}>
                    Join
                </Button>
            </div>
        </div>
    )
}
