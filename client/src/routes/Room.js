import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button, IconButton, Grid, Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom'

import Move from '../components/action/Move'
import Drag from '../components/action/Drag'
import Video from '../components/video/Video'
import MyVideo from '../components/video/MyVideo';
import RoomForm from '../components/form/RoomForm';
import Backdrop from '../components/form/Backdrop';
import Chat from '../components/chat/Chat';

import { SocketContext } from '../context/SocketContext'
import { UserContext } from '../context/UserContext';

const useStyles = makeStyles((theme) => ({
    Toolbar: {
        minHeight: 36
    },
    root: {
        flexGrow: 1
    },
    navigation: {
        height: "40px",
        marginBottom: '10px'
    },
    chat: {
        height: '90vh',
        borderRadius: 20,
        position: "relative",
        backgroundColor: theme.palette.success.light
    },
    table: {
        height: '90vh',
        borderRadius: 20,
        position: "relative",
        backgroundColor: theme.palette.action.disabledBackground
    },
    grid: {
        maxWidth: '2000px',
        justifyContent: 'center'
    }
}));

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

    useEffect(() => {
        console.log(users);
    }, [users])

    return (
        <div className={classes.root}>
            <div className={classes.navigation}>
                <AppBar>
                    <Toolbar className={classes.Toolbar}>
                        <IconButton edge="start" onClick={backHandler}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Button color="inherit">User</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <Grid container spacing={3} className={classes.grid}>  
                <Grid item xs={8}>  
                    <Paper className={classes.table}>
                        Table
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
                        })} 
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.chat}>
                        <Chat />
                    </Paper>
                </Grid>
            </Grid> 
            {!commit && <RoomForm roomID={roomID} socket={socket}/>}
            {!commit && <Backdrop/>}
             
        </div>
    )
}
