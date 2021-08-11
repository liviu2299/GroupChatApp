import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom'

import Move from '../components/action/Move'
import Drag from '../components/action/Drag'
import Video from '../components/video/Video'
import MyVideo from '../components/video/MyVideo';
import RoomForm from '../components/form/RoomForm';
import Backdrop from '../components/form/Backdrop';

import {SocketContext} from '../context/SocketContext'
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles({
    Toolbar: {
        minHeight: 36
    }
})

export default function Room(props) {

    const classes = useStyles();
    const history = useHistory();

    const { users, userVideo, socket } = useContext(SocketContext);
    const { commit } = useContext(UserContext)

    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/')+1);

    function backHandler() {
        history.push(`/`);
        socket.disconnect();
    }

    return (
        <div>
            {commit &&
            <AppBar>
                <Toolbar className={classes.Toolbar}>
                    <IconButton edge="start" onClick={backHandler}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Button color="inherit">User</Button>
                </Toolbar>
            </AppBar>
            }
            <Drag>
                <MyVideo data={userVideo}/>
            </Drag>
            {
            users && users.map((user) => {
                return(
                    <Move key={user.id} x={user.position.x} y={user.position.y} id={user.id}>
                        <Video peer={user.peer} name={user.name}/>
                    </Move>   
                )
            })
            }
            {!commit && <RoomForm roomID={roomID} socket={socket}/>}
            {!commit && <Backdrop/>}
                
        </div>
    )
}
