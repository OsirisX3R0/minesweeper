import React, { useState, useEffect, useContext } from 'react'

import { GameContext } from '../Context/GameContext'
import { Cell } from '../Styles'

const Space = ({ space }) => {
    const { width, getAdjacentSpaces, openSpace, openAdjacent, markSpace, gameOver, gameOverProcess } = useContext(GameContext)
    const [adjacentSpaces] = useState(getAdjacentSpaces(space.row, space.space))
    const [alreadyOpen, setAlreadyOpen] = useState(false)
    
    console.log(`Space ${space.id} rendered`)

    useEffect(() => {
        if(space.isOpen && !alreadyOpen && space.mineCount === 0 && !gameOver){
            setAlreadyOpen(true)
            openAdjacent(adjacentSpaces)
        }
    }, [space.isOpen, space.mineCount, adjacentSpaces, alreadyOpen, gameOver, openAdjacent])

    const onContextMenu = e => {
        e.preventDefault()
        markSpace(space.id)
    }

    const onClick = () => {
        if (space.isMine) {
            gameOverProcess()
        } else {
            openSpace(space.id, adjacentSpaces)
        }
    }

    const displayValue = () => {
        if (space.isMarked) {
            return 'F'
        }

        if (space.isOpen) {
            if(space.isMine) {
                return 'X'
            }

            switch(space.mineCount) {
                case 0:
                    return 'O';
                default:
                    return space.mineCount;
            }
        }

        return null
    }

    const cellProps = {width, space, onContextMenu, onClick}
    
    return (
        <Cell {...cellProps}>
            {displayValue()}
        </Cell>
    )
}

export default Space;