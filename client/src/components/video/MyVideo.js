import React, {useRef, useContext, useMemo, useEffect} from 'react'
import styled from 'styled-components'

import { UserContext } from '../../context/UserContext';

import './Video.css'

export default function MyVideo(props) {

    const { myName, color } = useContext(UserContext)

    useEffect(() => {
        console.log(color);
    }, [])

    return (
        <div>
            <div className="myborder" style={{ border: `4px solid ${color.hex}` }}>
                <video muted ref={props.data} autoPlay playsInline/>
            </div>
            <div className="name" unselectable="on">{myName}</div>
        </div>
    )
}
