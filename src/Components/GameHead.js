import React from 'react'
import useGameTime from '../Hooks/useGameTime'
import useRemainingSpaces from '../Hooks/useRemainingSpaces'
import { GameHeadContainer, SpacesLeft, Time } from '../Styles'

const GameHead = () => {
    const gameTime = useGameTime()
    const remainingSpaces = useRemainingSpaces()

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