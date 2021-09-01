import { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color'

import './Form.css'

import { UserContext } from '../../context/UserContext';

export default function RoomForm(props) {

    const { myName, color, setMyName, setColor, setCommit } = useContext(UserContext);

    const submitHandler = () => {
        setCommit(true);
        props.socket.emit('sending-info', {name: myName, id: props.socket.id, color: color.hex});
    }

    return (
        <div className="modal">
            <form onSubmit={submitHandler}>
                <TextField 
                    label="Name"
                    variant="outlined"
                    required
                    value={myName}
                    onChange={e => setMyName(e.target.value)}
                />
                <div className="innerContainer">
                    <CirclePicker 
                        color={color}
                        onChangeComplete={setColor}
                    />
                </div>
                <div>
                    <Button type="submit" variant="contained">
                        Join
                    </Button>
                </div>
            </form>
        </div>
    )
}
