import { useState, useEffect, useRef, useCallback } from "react";

// import useInterval from "./useInterval";


const useGameTime = gameBoard => {
    const [timer, setTimer] = useState(0)
    const [gameTime, setGameTime] = useState("")
    const interval = useRef(null)

    const stopTime = useCallback(() => {
        clearInterval(interval.current)
    }, [])

    useEffect(() => {
        interval.current = setInterval(() => {
            if (gameBoard && gameBoard.length > 0) {
                setTimer(timer + 1)
            }
        }, 1000)

        return () => stopTime()
    })

    const resetTime = useCallback(() => setTimer(0), [])

    // useInterval(() => {
    //     if (gameBoard && gameBoard.length > 0 && !gameWon) {
    //         setTimer(timer + 1)
    //     }
    // }, 1000)   
    
    useEffect(() => {
        const displayTime = () => {
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;
            setGameTime(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
        }

        displayTime()   
    }, [timer])

    return [gameTime, stopTime, resetTime]
}

export default useGameTime