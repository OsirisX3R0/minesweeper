import React, { useContext } from 'react';

import GameHead from './GameHead'
import Spaces from './Spaces';
import { GameContext } from '../Context/GameContext'
import { Container } from '../Styles'
import GameWon from './GameWon';

const Board = () => {
    const { gameBoard, gameOver } = useContext(GameContext)

    const gameOverScreen = gameOver && (
        <h1>GAME OVER</h1>
    )

    const displayBoard = () => {
        if (gameBoard && gameBoard.length > 0) {
            return (
                <Container>
                    <GameHead />
                    <GameWon />
                    <Spaces />
                </Container>
            )            
        }

        return (
            <Container>
                <div className="start-new">Start a new Game</div>
            </Container>
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