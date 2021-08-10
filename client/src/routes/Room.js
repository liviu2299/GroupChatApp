import React, {useEffect, useContext, useRef, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom'

import Move from '../components/action/Move'
import Drag from '../components/action/Drag'
import Video from '../components/video/Video'
import MyVideo from '../components/video/MyVideo';
import RoomForm from '../components/form/RoomForm';

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
    const { me, setMe } = useContext(UserContext)

    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/')+1);

    function backHandler() {
        history.push(`/`);
        socket.disconnect();
    }

    useEffect(() => {
        console.log(users);
    }, [users])

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
            {
            users && users.map((user) => {
                return(
                    <Move x={user.position.x} y={user.position.y} id={user.id}>
                        <Video key={user.id} peer={user.peer} name={user.name}/>
                    </Move>   
                )
            })
            }
            {me==='' && <RoomForm name={me} setName={setMe} roomID={roomID} socket={socket}/>}
                
        </div>
    )
}
