import React, {useEffect, useRef} from 'react'

import './Video.css'

export default function Video(props) {

    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <div className="border">
            <div>
                <video playsInline autoPlay ref={ref} />
            </div>
            <p className="name">{props.name}</p>
        </div>
        
        
    );
}
