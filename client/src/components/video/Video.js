import { useEffect, useRef, useState, useContext } from 'react'

import { UserContext } from '../../context/UserContext';

import './Video.css'

export default function Video(props) {

    const { usersAround } = useContext(UserContext);

    const ref = useRef();

    const [mute, setMute] = useState(true);

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);
    
    useEffect(() => {
        if(usersAround.find(elem => elem.id === props.id)){
            setMute(false);
            ref.current.muted = false;
            ref.current.defaultMuted = false;
        } else{
            setMute(true);
            ref.current.muted = true;
            ref.current.defaultMuted = true;
        }
    }, [usersAround])

    return (
        <div>    
            <div className="userborder" style={{ border: `4px solid ${props.color}` }}>
                <video disablePictureInPicture muted playsInline autoPlay ref={ref} />
            </div>
            <div className="info" unselectable="on">
                <div className="name2" unselectable="on">
                    {props.name}
                    {
                        mute ? 
                        (<div className="off"></div>):
                        [<div className="on"></div>]
                    }      
                </div>     
            </div>   
        </div>
        
    );
}