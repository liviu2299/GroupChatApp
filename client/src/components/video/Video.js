import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

const Border = styled.div`
    border-radius: 20px;
    overflow: hidden;
    background-color: red;
    border: 2px solid #E26D54;
    width: 100px;
    height: 75px;
`;

export default function Video(props) {

    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <Border>
            <video playsInline autoPlay ref={ref} />
        </Border>
        
    );
}
