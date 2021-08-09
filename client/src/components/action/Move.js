import React, {useState, useMemo, useEffect} from 'react'

export default function Move(props) {

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    
    useEffect( () => {
        setPosition({
            x: props.x,
            y: props.y
        })
    }, [props.x, props.y])

    const styles = useMemo( () => ({
        left: `${position.x}px`,
        transition: 'all 0.2s linear',
        top: `${position.y}px`,
        position: 'absolute'
    }), [position])
    
    return (
        <div>
            <div style={styles}> 
                {props.children}
            </div>
        </div>
    )
        
        
}
