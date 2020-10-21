import React, { useState, useEffect, useContext } from 'react'

import { GameContext } from '../Context/GameContext'
import { Cell } from '../Styles'

const Space = ({ space }) => {
    const { gameBoard, getAdjacentSpaces, openSpace, openAdjacent, markSpace } = useContext(GameContext)
    const [adjacentSpaces] = useState(getAdjacentSpaces(space.row, space.space))
    const [alreadyOpen, setAlreadyOpen] = useState(false)
    
    console.log(`Space ${space.id} rendered`)

    useEffect(() => {
        if(space.isOpen && !alreadyOpen && space.mineCount === 0){
            setAlreadyOpen(true)
            openAdjacent(adjacentSpaces)
        }
    }, [space.isOpen, alreadyOpen])

    const onContextMenu = e => {
        e.preventDefault()
        markSpace(space.id)
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
    
    return (
        <Cell
            space={space}
            onContextMenu={onContextMenu}
            onClick={() => openSpace(space.id, adjacentSpaces)}
        >
            {displayValue()}
        </Cell>
    )
}

export default Space;