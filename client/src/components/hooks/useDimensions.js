import React, {useState, useEffect} from 'react'

export default function useDimensions(ref) {
    const [dimensions, setDimensions] = useState({
        height: 1,
        width: 1
    });

    useEffect(() => {
        if(ref.current) {
            const { current } = ref;
            const boundingRect = current.getBoundingClientRect();
            const { width, height } = boundingRect;
            setDimensions({
                width: Math.round(width),
                height: Math.round(height)
            })
        }
    }, [ref])

    return dimensions
}
