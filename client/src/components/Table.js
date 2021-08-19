import React, {useEffect, useState, useRef, createRef, useContext} from 'react'

import { SocketContext } from '../context/SocketContext';

import useDimensions from './hooks/useDimensions';
import Drag from './action/Drag';
import Move from './action/Move';
import Video from './video/Video';
import MyVideo from './video/MyVideo';

import './Table.css'

export default function Table(props) {

    const divRef = createRef();
    const dimensions = useDimensions(divRef);

    const { users, userVideo } = useContext(SocketContext);

    return (
        <div className="table" ref={divRef}>
            Table {dimensions.width}x{dimensions.height}
            <Drag dimensions={dimensions}>
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
        </div>
    )
}
