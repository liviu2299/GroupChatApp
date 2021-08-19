import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Form.css'

import { UserContext } from '../../context/UserContext';

export default function RoomForm(props) {

    const { me, setMe, setCommit } = useContext(UserContext);

    const submitHandler = () => {
        setCommit(true);
        props.socket.emit('sending-info', {name: me, id: props.socket.id});
    }

    return (
        <div className="modal">
            <form onSubmit={submitHandler}>
                <TextField 
                    label="Name"
                    variant="outlined"
                    required
                    value={me}
                    onChange={e => setMe(e.target.value)}
                />
                <div>
                    <Button type="submit" variant="contained">
                        Join
                    </Button>
                </div>
            </form>
        </div>
    )
}
