import { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CirclePicker } from 'react-color'

import './Form.css'

import { UserContext } from '../../context/UserContext';

export default function Form(props) {

    const { myName , setMyName, color, setColor } = useContext(UserContext);

    return (
        <div className="modal">
            <form onSubmit={props.handleSubmit}>
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
                    Create Room
                </Button>
            </div>
        </form>
        </div>
    )
}
