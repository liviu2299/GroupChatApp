import React, {useState, useEffect, useRef} from "react";
import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io.connect("/");
const SocketContext = React.createContext();

const videoConstraints = {
    height: { exact: 75 },
    width: { exact: 100 }
};

const ContextProvider = ({ children }) => {

    const [users, setUsers] = useState([]);
    const [connected, setConnected] = useState(false);

    const usersRef = useRef([]);
    const userVideo = useRef();

    const url = window.location.href;
    const roomID = url.substring(url.lastIndexOf('/')+1);

    useEffect(() => {
  
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
        
            socket.emit('join room', roomID);

            // Getting users already in the room (1)
            socket.on("all users", (usersInThisRoom, initialPosition) => {

                console.log('/////////////');
                console.log(usersInThisRoom);
                console.log(initialPosition);

                usersInThisRoom.forEach(id => {

                    const peer = createPeer(id, socket.id, stream);

                    usersRef.current.push({
                        id: id,
                        position: {
                            x: initialPosition[id].x,
                            y: initialPosition[id].y
                        },
                        peer
                    });
                    setUsers((prevUsers) => {
                        return prevUsers.concat({
                            id: id,
                            position: {
                                x: initialPosition[id].x,
                                y: initialPosition[id].y
                            },
                            peer
                        })
                    })
                });
                console.log('Am primit useri: ' + usersInThisRoom);
            })
        
            // Getting new user (2)
            socket.on("user-joined", payload => {
                
                const peer = addPeer(payload.signal, payload.callerID, stream);

                usersRef.current.push({
                    id: payload.callerID,
                    position: {
                        x: 0,
                        y: 0
                    },
                    peer
                });
                setUsers((prevUsers) => {
                    return prevUsers.concat({
                        id: payload.callerID,
                        position: {
                            x: 0,
                            y: 0
                        },
                        peer
                    })
                })
                console.log('Am primit id: ' + payload.callerID);
            })

            socket.on('receiving returned signal', payload => {
                const item = usersRef.current.find(p => p.id === payload.id);
                item.peer.signal(payload.signal);
            })

            // Updating users after disconnect
            socket.on("user-left", id => {

                usersRef.current.filter(user => user.id !== id);
                
                setUsers((prevUsers) => {
                    return prevUsers.filter(user => user.id !== id);
                })
                console.log('Deconectat: ' + id);
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
                      

                console.log('Userul ' + payload.id + ' s-a updatat la ' + payload.position.x + ' ' + payload.position.y);
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
            socket.emit('sending signal', { userToSignal, callerID, signal })
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
    

    useEffect( () => {
        usersRef.current.forEach(i => {
            console.log('usersRef: ' + i.id + ' ' + i.position.x + ' ' + i.position.y)
        })
        
    })

    return (
        <SocketContext.Provider value={{
            users,
            setUsers,
            socket,
            userVideo,
        }}>
            {children}
        </SocketContext.Provider>
    )
}

export { ContextProvider, SocketContext };