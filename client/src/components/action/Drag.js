import { useState, useMemo, useCallback, useEffect, useContext } from 'react'

import { SocketContext } from '../../context/SocketContext'
import { UserContext } from '../../context/UserContext';

import './Drag.css'

const imageHeight = 1167 - 98;
const imageWidth = 2000 - 104;

export default function Drag(props) {

    const { socket } = useContext(SocketContext);
    const { setProximity }  = useContext(UserContext);

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
         
    }, [state.origin, state.last]);

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
        setProximity(state.translation);
    }, [state.translation])

    const styles = useMemo( () => ({
        cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        transform: `translate3d(${state.translation.x}px, ${state.translation.y}px, 0)`,
        transition: state.isDragging ? 'none' : 'transition: transform ease-in-out 0.2s',
        zIndex: state.isDragging ? 2 : 1,
        position: 'absolute',
    }), [state.isDragging, state.translation])

    return (
        <div>
            <div style={styles} className="drag" onMouseDown={handleMouseDown}>
                {props.children}
            </div>
        </div>
        
    )
}