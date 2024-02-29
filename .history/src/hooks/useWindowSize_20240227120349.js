import { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize ({
                width :window.innerWidth,
                height: window.innerHeight
            })
        } 

        handleResize();

        window.addEventListener("resize", handleResize);

        // This return is placed inside the useEffect. The purpose of this is to avoid memory leack, Its like a cleanup process
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return windowSize;

}

export default useWindowSize