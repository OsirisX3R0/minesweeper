import React, { useState, useEffect, useContext, useCallback } from 'react';

import GameHead from './GameHead'
import Spaces from './Spaces';
import { GameContext } from '../Context/GameContext'
//import useGameTime from '../Hooks/useGameTime'

const Board = () => {
    const { gameBoard, gameOver } = useContext(GameContext)

    const gameOverScreen = gameOver && (
        <h1>GAME OVER</h1>
    )

    const displayBoard = () => {
        if (gameBoard && gameBoard.length > 0) {
            return (
                <div className="container">
                    <GameHead />
                    <Spaces />
                </div>
            )            
        }

        return (
            <div className="container">
                <div className="start-new">Start a new Game</div>
            </div>
        )
    }

    return (
        <>
            {gameOverScreen}
            {displayBoard()}
        </>
    )
}

export default Board;