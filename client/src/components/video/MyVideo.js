import { useContext, useEffect } from 'react'

import { UserContext } from '../../context/UserContext';

import './Video.css'

export default function MyVideo(props) {

    const { myName, color } = useContext(UserContext)

    return (
        <div>
            <div className="myborder" style={{ border: `4px solid ${color.hex}` }}>
                <video disablePictureInPicture muted ref={props.data} autoPlay playsInline/>
            </div>
            <div className="name" unselectable="on">{myName}</div>
        </div>
    )
}          
