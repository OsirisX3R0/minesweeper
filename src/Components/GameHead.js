import React, { useContext } from 'react'
import { GameContext } from '../Context/GameContext'
import { GameHeadContainer, SpacesLeft, Time } from '../Styles'

const GameHead = () => {
    const {gameTime, remainingSpaces} = useContext(GameContext)
    return (
        <GameHeadContainer>
            <SpacesLeft>
                {remainingSpaces}
            </SpacesLeft>
            <Time>
                {gameTime}
            </Time>
        </GameHeadContainer>
    )
}

export default GameHead