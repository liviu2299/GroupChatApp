import React, {useRef} from 'react'
import styled from 'styled-components'

const Border = styled.div`
    border-radius: 20px;
    overflow: hidden;
    background-color: green;
    border: 2px solid #4AD761;
    width: 100px;
    height: 75px;
`;

export default function MyVideo(props) {

    return (
        <Border>
            <video muted ref={props.data} autoPlay playsInline/>
        </Border>
    )
}
