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
import Table from '../components/Table';

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
        height: '87vh',
        borderRadius: 20,
        position: "relative",
        backgroundColor: theme.palette.success.light
    },
    table: {
        height: '87vh',
        borderRadius: 20,
        position: "relative",
        backgroundColor: theme.palette.action.disabledBackground
    },
    grid: {
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
            <Grid container spacing={2} className={classes.grid}>  
                <Grid item xs={8} sm={8} md={8} lg={8}>  
                    <Paper className={classes.table}>
                        <Table />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={3} md={3} lg={2}>
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
