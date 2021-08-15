import React, {useRef, useContext} from 'react'
import styled from 'styled-components'

import { UserContext } from '../../context/UserContext';

const Border = styled.div`
    border-radius: 20px;
    overflow: hidden;
    background-color: green;
    border: 2px solid #4EB963;
    width: 100px;
    height: 75px;
`;

const Name = styled.p`
    text-align: center;
    margin-top: 0;
`;

export default function MyVideo(props) {

    const { me } = useContext(UserContext)

    return (
        <div>
            <Border>
                <video muted ref={props.data} autoPlay playsInline/>
            </Border>
            <Name unselectable="on">{me}</Name>
        </div>
    )
}
