import React, {useRef, useContext} from 'react'
import styled from 'styled-components'

import { UserContext } from '../../context/UserContext';

const Border = styled.div`
    border-radius: 20px;
    overflow: hidden;
    background-color: green;
    border: 2px solid #4AD761;
    width: 100px;
    height: 75px;
`;

export default function MyVideo(props) {

    const { me } = useContext(UserContext)

    return (
        <div>
            <Border>
                <video muted ref={props.data} autoPlay playsInline/>
            </Border>
            {me}
        </div>
    )
}
