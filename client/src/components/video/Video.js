import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

import './Video.css'

export default function Video(props) {

    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);
    
    return (
        <div>
            <div className="userborder" style={{ border: `4px solid ${props.color}` }}>
                <video playsInline autoPlay ref={ref} />
            </div>
            <div className="name" unselectable="on">{props.name}</div>
        </div>
        
    );
}
