import React, { useContext } from 'react'
import { GameContext } from '../Context/GameContext'
import { Button, GameWonContainer, Header } from '../Styles'

const GameWon = () => {
    const { gameWon, width, height, gameTime, goToMenu, resetGame } = useContext(GameContext)

    const displayGameWon = gameWon && (
        <GameWonContainer>
            <Header>You Win!</Header>

            <h3>({width} x {height})</h3>
            <small>Time:</small>
            <div>{gameTime}</div>
            <Button fill onClick={() => resetGame()}>Play Again</Button>
            <Button onClick={() => goToMenu()}>Menu</Button>
        </GameWonContainer>
    )

    return displayGameWon
}

export default GameWon