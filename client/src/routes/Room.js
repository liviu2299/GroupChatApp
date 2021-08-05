import React, {useEffect, useContext, useRef} from 'react'

import Square from '../components/Square'
import MySquare from '../components/MySquare'

import Move from '../components/action/Move'
import Drag from '../components/action/Drag'

import Video from '../components/video/Video'

import {SocketContext} from '../context/SocketContext'

export default function Room(props) {

    const { users, userVideo } = useContext(SocketContext);

    useEffect(() => {
        console.log(users);
    }, [users]);

    return (
        <div>
            <Drag>
                <video muted ref={userVideo} autoPlay playsInline/>
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
