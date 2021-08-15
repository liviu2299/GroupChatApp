import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'

const Border = styled.div`
    border-radius: 20px;
    overflow: hidden;
    background-color: red;
    border: 2px solid #D32525;
    width: 100px;
    height: 75px;
`;

const Name = styled.p`
    text-align: center;
    margin-top: 0;
`;

export default function Video(props) {

    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    useEffect(() => {
        console.log(props.name);
    })

    return (
        <div>
            <Border>
                <video playsInline autoPlay ref={ref} />
            </Border>
            <Name unselectable="on">{props.name}</Name>
        </div>
        
        
    );
}
