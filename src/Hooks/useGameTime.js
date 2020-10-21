import { useContext, useState, useEffect } from "react";

import useInterval from "./useInterval";
import { GameContext } from "../Context/GameContext";


const useGameTime = () => {
    const { gameBoard } = useContext(GameContext)
    const [timer, setTimer] = useState(0)
    const [gameTime, setGameTime] = useState("")

    useInterval(() => {
        if (gameBoard && gameBoard.length > 0) {
            setTimer(timer + 1)
        }
    }, 1000)   
    
    useEffect(() => {
        const displayTime = () => {
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;
            setGameTime(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`)
        }

        displayTime()   
    }, [timer])

    return gameTime
}

export default useGameTime