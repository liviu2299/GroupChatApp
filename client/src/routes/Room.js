import React, {useEffect, useContext, useRef} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom'

import Move from '../components/action/Move'
import Drag from '../components/action/Drag'
import Video from '../components/video/Video'
import MyVideo from '../components/video/MyVideo';

import {SocketContext} from '../context/SocketContext'

const useStyles = makeStyles({
    Toolbar: {
        minHeight: 36
    }
})

export default function Room(props) {

    const classes = useStyles();
    const { users, userVideo, socket } = useContext(SocketContext);
    const history = useHistory();

    function backHandler() {
        history.push(`/`);
        socket.disconnect();
    }

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            <AppBar>
                <Toolbar className={classes.Toolbar}>
                    <IconButton edge="start" onClick={backHandler}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Button color="inherit">User</Button>
                </Toolbar>
            </AppBar>
            <Drag>
                <MyVideo data={userVideo}/>
            </Drag>
            {users && users.map((user) => {
                return(
                    <Move x={user.position.x} y={user.position.y} id={user.id}>
                        <Video key={user.id} peer={user.peer}/>
                    </Move>   
                )
            })}
        </div>
    )
}
