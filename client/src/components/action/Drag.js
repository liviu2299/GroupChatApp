import React, {useState, useMemo, useCallback, useEffect, useContext, useRef} from 'react'

import { SocketContext } from '../../context/SocketContext'
import { UserContext } from '../../context/UserContext';

const imageHeight = 1167 - 98;
const imageWidth = 2000 - 104;

export default function Drag(props) {

    const { socket } = useContext(SocketContext);
    const { setProximity, proximity }  = useContext(UserContext);

    const [maxDimensions, setMaxDimensions] = useState({
        width: 500,
        height: 500
    })

    const [state, setState] = useState({
        isDragging: false,
        origin: {x: 0, y: 0},           // Original position
        translation: {x: 0, y: 0},      // Translation position
        last: {x: 0, y: 0} 
    })

    const handleMouseDown = useCallback(({clientX, clientY}) => {
        setState(state => ({
            ...state,
            isDragging: true,
            origin: {x: clientX, y: clientY}
        }));

    }, []);

    const handleMouseMove = useCallback(({clientX, clientY}) => {
        const translation = {x: clientX - state.origin.x + state.last.x, y: clientY - state.origin.y + state.last.y};

        if(translation.y >= imageHeight){ // DOWN
            setState(state => ({
                ...state,
                translation: {x: translation.x, y: imageHeight}
            }))             
        }
        if(translation.y < 0){   // UP
            setState(state => ({
                ...state,
                translation: {x: translation.x, y: 0}
            }))
        }
    
        if(translation.x >= imageWidth){   // RIGHT
            setState(state => ({
                ...state,
                translation: {x: imageWidth, y: translation.y}
            }))
        }
        if(translation.x < 0){    // LEFT
            setState(state => ({
                ...state,
                translation: {x: 0, y: translation.y}
            }))

        }
        if(translation.x > imageWidth && translation.y > imageHeight){   // DOWN-RIGHT
            setState(state => ({
                ...state,
                translation: {x: imageWidth, y: imageHeight}
            }))

        }
        if(translation.x > imageWidth && translation.y < 0){   // UP-RIGHT
            setState(state => ({
                ...state,
                translation: {x: imageWidth, y: 0}
            }))

        }
        if(translation.x < 0 && translation.y < 0){     // UP-LEFT
            setState(state => ({
                ...state,
                translation: {x: 0, y: 0}
            }))

        }
        if(translation.x < 0 && translation.y > imageHeight){      // DOWN-LEFT
            setState(state => ({
                ...state,
                translation: {x: 0, y: imageHeight}
            }))

        }
        if(translation.x <= imageWidth && translation.y <= imageHeight && translation.x >= 0 && translation.y >= 0){  // CENTER
            setState(state => ({
                ...state,
                translation
            })) 

        } 

        //setProximity(translation);
         
    }, [state.origin, state.last, maxDimensions.width, maxDimensions.height]);

    const handleMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        setState(state => ({
            ...state,
            isDragging: false,
            last: state.translation,
            origin: {x: 0, y: 0}
        }));

    }, [handleMouseMove]);

    useEffect(() => {
        if(state.isDragging){
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else{
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [state.isDragging, handleMouseMove, handleMouseUp]);

    // Every time object stops send position
    useEffect(() => {
        socket.emit('internal position incoming', {id: socket.id, position: {x: state.last.x, y: state.last.y}});
    }, [socket, state.last])

    useEffect(() => {
        setMaxDimensions({
            height: props.dimensions.height - 99,
            width: props.dimensions.width - 102
        });
    }, [props.dimensions.height, props.dimensions.width])

    useEffect(() => {
        setProximity(state.translation);
    }, [state.translation])

    const styles = useMemo( () => ({
        cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        left: `${state.translation.x}px`,
        top: `${state.translation.y}px`,
        transition: state.isDragging ? 'none' : 'transition: ease-in-out 0.2s linear',
        zIndex: state.isDragging ? 2 : 1,
        position: 'absolute',
    }), [state.isDragging, state.translation])

    return (
        <div>
            <div style={styles} onMouseDown={handleMouseDown}>
                {props.children}
            </div>
        </div>
        
    )
}