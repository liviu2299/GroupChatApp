import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Form.css'

import { UserContext } from '../../context/UserContext';

export default function Form(props) {

    const { me , setMe } = useContext(UserContext);

    return (
        <div className="modal">
            <form onSubmit={props.handleSubmit}>
            <TextField 
                label="Name"
                variant="outlined"
                required
                value={me}
                onChange={e => setMe(e.target.value)}
            />
            <div>
                <Button type="submit" variant="contained">
                    Create Room
                </Button>
            </div>
        </form>
        </div>
    )
}
