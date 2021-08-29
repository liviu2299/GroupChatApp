import React, {useEffect, useState, useRef, createRef, useCallback, useContext} from 'react'

import { SocketContext } from '../context/SocketContext';

import useDimensions from './hooks/useDimensions';
import Drag from './action/Drag';
import Move from './action/Move';
import Video from './video/Video';
import MyVideo from './video/MyVideo';
import Image from './Image'
import Rectangle from './dummies/Rectangle';
import Circle from './action/Circle';

import './Table.css'

export default function Table(props) {

    const { users, userVideo } = useContext(SocketContext);
    const divRef = createRef();
    const backgroundRef = createRef();
    const dimensions = useDimensions(divRef);

    return (
        <div className="background" ref={backgroundRef} >
            <Image backgroundRef={backgroundRef}/>
            <Circle />
            <Drag dimensions={dimensions}>
                <MyVideo data={userVideo}/>
            </Drag>
            {
                users && users.map((user) => {
                    return(
                        <Move key={user.id} x={user.position.x} y={user.position.y} id={user.id}>
                            <Video peer={user.peer} name={user.name} color={user.color}/>
                        </Move>        
                    )
                })}
        </div>
    )
}
