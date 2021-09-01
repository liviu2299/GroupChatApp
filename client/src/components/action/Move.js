import { useMemo } from 'react'

export default function Move(props) {

    const styles = useMemo( () => ({
        left: `${props.x}px`,
        transition: 'all 0.2s ease-in-out',
        top: `${props.y}px`,
        position: 'absolute'
    }), [props.x, props.y])
    
    return (
        <div>
            <div style={styles}> 
                {props.children}
            </div>
        </div>
    )
        
        
}
