import React, { useContext } from 'react'
import { GameContext } from '../Context/GameContext'
import { Button, GameWonContainer, Grid, Header } from '../Styles'

const GameWon = () => {
    const { gameWon, width, height, gameTime } = useContext(GameContext)

    return (
        <GameWonContainer>
            <Header>You Win!</Header>

            <h3>({width} x {height})</h3>
            <small>Time:</small>
            <div>{gameTime}</div>
            <Button fill>Play Again</Button>
            <Button>Menu</Button>
        </GameWonContainer>
    )
}

export default GameWon