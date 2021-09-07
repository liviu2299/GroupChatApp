import { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Grid, Paper } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom'

import RoomForm from '../components/form/RoomForm';
import Backdrop from '../components/form/Backdrop';
import Chat from '../components/chat/Chat';
import Table from '../components/workspace/Table';

import { SocketContext } from '../context/SocketContext'
import { UserContext } from '../context/UserContext';

import './Room.css'

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
        backgroundColor: theme.palette.success.light,
        border: "2px solid black",
    },
    table: {
        height: '90vh',
        borderRadius: 20,
        position: "relative",
        backgroundColor: theme.palette.action.disabledBackground,
        border: "2px solid black",
    },
    grid: {
        justifyContent: 'center'
    }
}));

export default function Room(props) {

    const classes = useStyles();
    const history = useHistory();

    const { socket, numberOfUsers } = useContext(SocketContext);
    const { commit, myName, color } = useContext(UserContext)

    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/')+1);

    function backHandler() {
        history.push(`/`);
        socket.disconnect();
        //socket.emit('leave room', socket.id);
    }

    useEffect(() => {
        socket.connect();
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.navigation}>
                <AppBar>
                    <Toolbar className={classes.Toolbar}>
                        <IconButton edge="start" onClick={backHandler}>
                            <ArrowBackIcon />
                        </IconButton>
                        {commit && <div className="color" style={{ backgroundColor: `${color.hex}` }}></div>}
                        {commit && <div className="name">{myName}</div>} 
                        <div className="title">Room: </div>
                        <div className="room">{roomID.substring(0, 8)}</div>
                        {commit && <div className="number">Online: {numberOfUsers+1}</div>}           
                    </Toolbar>
                </AppBar>
            </div>
            <Grid container spacing={2} className={classes.grid}>  
                <Grid item xs={9} sm={9} md={8} lg={9}>  
                    <Paper className={classes.table}>
                        <Table />
                    </Paper>
                </Grid>
                <Grid item xs={3} sm={3} md={3} lg={2}>
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
