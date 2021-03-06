import React, {useState, useEffect, useRef, useContext} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useHistory } from 'react-router-dom'

import { UserContext } from './UserContext'

const socket = io.connect("/");
const SocketContext = React.createContext();

const videoConstraints = {
    height: { exact: 98 },
    width: { exact: 130 }
};

const ContextProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [numberOfUsers, setNumberOfUsers] = useState(0);

    const { myName, color } = useContext(UserContext)

    const history = useHistory();

    const usersRef = useRef([]);
    const userVideo = useRef();

    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/')+1);

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            
            // Joining room
            socket.emit('join room', {roomID: roomID, userInfo: {name: myName, color: color.hex}});

            socket.on('waiting room', () => {
                history.push(`/waitingroom`);
                socket.disconnect();
            })

            // Welcome to the Room msg
            setMessages((prevMessages) => {
                return prevMessages.concat({id: "bot", user: 'bot', text: 'Welcome to the room'});
            });
                
            // Getting users already in the room (1)
            socket.on("all users", (users, initialPosition) => {

                const usersInThisRoom = users.filter(user => user.id !== socket.id);

                usersInThisRoom.forEach(user => {

                    const peer = createPeer(user.id, socket.id, stream);

                    usersRef.current.push({
                        id: user.id,
                        name: user.name,
                        color: user.color,
                        position: {
                            x: initialPosition[user.id].x,
                            y: initialPosition[user.id].y
                        },
                        peer
                    });
                    setUsers((prevUsers) => {
                        return prevUsers.concat({
                            id: user.id,
                            name: user.name,
                            color: user.color,
                            position: {
                                x: initialPosition[user.id].x,
                                y: initialPosition[user.id].y
                            },
                            peer
                        })
                    })
                });
            })
            
            // Getting new user (2)
            socket.on("user-joined", payload => {
                
                const peer = addPeer(payload.signal, payload.callerID, stream);

                usersRef.current.push({
                    id: payload.callerID,
                    position: {
                        x: payload.initialPosition[payload.callerID].x,
                        y: payload.initialPosition[payload.callerID].y
                    },
                    peer
                });
                
                setUsers((prevUsers) => {
                    return prevUsers.concat({
                        id: payload.callerID,
                        position: {
                            x: payload.initialPosition[payload.callerID].x,
                            y: payload.initialPosition[payload.callerID].y
                        },
                        peer
                    })
                })
                
                socket.emit('get user info', {myId: socket.id, id: payload.callerID});
            })

            socket.on('receiving returned signal', payload => {
                const item = usersRef.current.find(p => p.id === payload.id);
                item.peer.signal(payload.signal);
            })

            // Updating users after disconnect
            socket.on("user-left", id => {

                const user = usersRef.current.find(user => user.id === id);
                usersRef.current.filter(user => user.id !== id);
                
                setUsers((prevUsers) => {
                    return prevUsers.filter(user => user.id !== id);
                })

                if(user.name){
                    setMessages((prevMessages) => {
                        return prevMessages.concat({id: "bot", user: 'bot', text: `${user.name} left the room`});
                    });
                }
            })

            // Updating the position
            socket.on("external position incoming", (payload) => {
                
                const index = usersRef.current.findIndex(x => x.id === payload.id);
                
                if(index > -1){
                    usersRef.current[index] = {
                        ...usersRef.current[index],
                        position: {
                            x: payload.position.x,
                            y: payload.position.y
                        }
                }}
                
                if(index > -1){
                    setUsers( (prevUsers) => {
                        const data = prevUsers.slice();
                        const index = data.findIndex(x => x.id === payload.id);
                        data[index] = {
                            ...data[index],
                            position: {
                                x: payload.position.x,
                                 y: payload.position.y
                            }
                        }
                        return (data);
                    }) 
                }           
            })

            // Updating info
            socket.on('update-info', (payload) => {

                const index = usersRef.current.findIndex(x => x.id === payload.id);
                if(index > -1){
                    
                    usersRef.current[index] = {
                        ...usersRef.current[index],
                        name: payload.name,
                        color: payload.color
                    }
                    
                    setUsers( (prevUsers) => {
                        const data = prevUsers.slice();
                        const index = data.findIndex(x => x.id === payload.id);
                        data[index] = {
                            ...data[index],
                            name: payload.name,
                            color: payload.color
                        }
                        return (data);
                    })

                    if(payload.name)
                    {
                        setMessages((prevMessages) => {
                            return prevMessages.concat({id: "bot", user: 'bot', text: `${payload.name} joined the room`});
                        });
                    }
                } 
            })

            // Getting message
            socket.on('get message', (payload) => {
                setMessages((prevMessages) => {
                    return prevMessages.concat({id: payload.id, user: payload.user, text: payload.text});
                });
            })
            
        })
        
    }, [])

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream
        });

        // Fires right away (initiator)
        peer.on('signal', signal => {
            socket.emit('sending signal', { userToSignal, callerID, signal})
        });
 
        return peer;
    }
    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream
        });
 
        // Waiting for the signal
        peer.on('signal', signal => {
            socket.emit('returning signal', { signal, callerID });
        })
 
        peer.signal(incomingSignal);
 
        return peer;
    }

    useEffect(() => {
        setNumberOfUsers(users.length);
    }, [users])

    return (
        <SocketContext.Provider value={{
            users,
            setUsers,
            socket,
            userVideo,
            messages,
            setMessages,
            numberOfUsers
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };