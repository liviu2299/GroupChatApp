import React, {useState, useMemo, useCallback, useEffect, useContext} from 'react'

import { SocketContext } from '../../context/SocketContext'

export default function Drag(props) {

    const {socket} = useContext(SocketContext);

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

        setState(state => ({
            ...state,
            translation
        }))
        
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

    const styles = useMemo( () => ({
        cursor: state.isDragging ? '-webkit-grabbing' : '-webkit-grab',
        left: `${state.translation.x}px`,
        top: `${state.translation.y}px`,
        transition: state.isDragging ? 'none' : 'transform 500ms',
        zIndex: state.isDragging ? 2 : 1,
        position: 'absolute'
    }), [state.isDragging, state.translation])


    // Every time object stops send position
    useEffect( () => {
        socket.emit('internal position incoming', {id: socket.id, position: {x: state.last.x, y: state.last.y}});
    }, [socket, state.last])

    return (
        <div>
            <div style={styles} onMouseDown={handleMouseDown}>
                <p>ME</p>
                <p>{socket.id}</p>
                <p>x:{state.translation.x} y:{state.translation.y}</p>
                {props.children}
            </div>
        </div>
        
    )
}