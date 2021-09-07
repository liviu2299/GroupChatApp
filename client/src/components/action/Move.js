import { useMemo } from 'react'

import './Drag.css'

export default function Move(props) {

    const styles = useMemo( () => ({
        transform: `translate3d(${props.x}px, ${props.y}px, 0)`,
        position: 'absolute',
        transition: `transform ease-in-out 0.4s`
    }), [props.x, props.y])
    
    return (
        <div>
            <div style={styles} className="drag"> 
                {props.children}
            </div>
        </div>
    )    
}
