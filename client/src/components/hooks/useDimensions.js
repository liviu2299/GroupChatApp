import { useState, useEffect } from 'react'

export default function useDimensions(ref) {
    const [dimensions, setDimensions] = useState({
        height: 500,
        width: 500
    });

    useEffect(() => {
        if(ref.current)
            {
                const { current } = ref;
                const boundingRect = current.getBoundingClientRect();
                const { width, height } = boundingRect;
                setDimensions({
                    width: Math.round(width),
                    height: Math.round(height)
                })
            }
    }, [])

    useEffect(() => {
        function handleResize() {
            if(ref.current)
            {
                const { current } = ref;
                const boundingRect = current.getBoundingClientRect();
                const { width, height } = boundingRect;
                setDimensions({
                    width: Math.round(width),
                    height: Math.round(height)
                })
            }    
        }
        window.addEventListener('resize', handleResize);

        return function cleanup() {
            window.removeEventListener('resize', handleResize);
        }
    })

    return dimensions
}
