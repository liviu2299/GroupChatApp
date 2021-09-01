import { useEffect, useState, useCallback } from 'react'

import classroom from '../../public/classroom2.png'
import './Image.css'

export default function Image(props) {

    const [scrollPosition, setScrollPosition] = useState({
        isDragging: false,
        origin: {x: 0, y: 0},
        translation: {x: 0, y: 0},
        last: {x: 0, y: 0} 
    });

    const handleMouseDown = useCallback(({clientX, clientY}) => {
        setScrollPosition(scrollPosition => ({
            ...scrollPosition,
            isDragging: true,
            origin: {x: clientX, y: clientY}
        }))

    }, [])

    const handleMouseMove = useCallback(({clientX, clientY}) => {
        const translation = {x: (clientX - scrollPosition.origin.x + scrollPosition.last.x) , y: (clientY - scrollPosition.origin.y + scrollPosition.last.y)};
    
        setScrollPosition(scrollPosition => ({
            ...scrollPosition,
            translation
        }));
        
        if(props.backgroundRef.current)
        {
            props.backgroundRef.current.scrollTop = -translation.y;
            props.backgroundRef.current.scrollLeft = -translation.x;
        }

    }, [scrollPosition.origin, scrollPosition.last]);

    const handleMouseUp = useCallback(() => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        setScrollPosition(scrollPosition => ({
            ...scrollPosition,
            isDragging: false,
            last: scrollPosition.translation,
            origin: {x: 0, y: 0}
        }));

    }, [handleMouseMove]);

    useEffect(() => {
        if(scrollPosition.isDragging){
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else{
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    }, [scrollPosition.isDragging, handleMouseMove, handleMouseUp])

    return (
        <div className="container" onMouseDown={handleMouseDown}>
            <img src={classroom} alt="classroom" className="image"/>
        </div>
    )
}
