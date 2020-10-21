import React from 'react'
import useGameTime from '../Hooks/useGameTime'
import useRemainingSpaces from '../Hooks/useRemainingSpaces'

const GameHead = () => {
    const gameTime = useGameTime()
    const remainingSpaces = useRemainingSpaces()

    return (
        <div className="game-head">
            <div className="spaces-left">
                {remainingSpaces}
            </div>
            <div className="time">
                {gameTime}
            </div>
        </div>
    )
}

export default GameHead