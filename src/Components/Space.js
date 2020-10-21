import React, { useState, useEffect, useCallback, useContext, useMemo, memo } from 'react';

import { GameContext } from '../Context/GameContext';
import useAdjacent from '../Hooks/useAdjacent';

const Space = ({ space }) => {
    const { gameBoard, getAdjacentSpaces, openSpace, openAdjacent, markSpace } = useContext(GameContext)
    const [adjacentSpaces] = useState(getAdjacentSpaces(space.row, space.space))//useAdjacent(space.row, space.space)
    const [alreadyOpen, setAlreadyOpen] = useState(false)
    //const adjacent = useMemo(() => getAdjacentSpaces(space.row, space.space), [])
    
    console.log(`Space ${space.id} rendered`)

    useEffect(() => {
        if(space.isOpen && !alreadyOpen && space.mineCount === 0){
            setAlreadyOpen(true)
            openAdjacent(adjacentSpaces)
        }
    }, [space.isOpen, alreadyOpen])

    // useEffect(() => {
    //    // if (space.isOpen && space.isMine)
    //     //     gameOverProcess()

    //     // if (space.isOpen && !space.isMine && space.mineCount === 0)
    //     //     getAdjacent(adjacent)
    // }, [space, gameOverProcess])

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
        <td 
            onContextMenu={onContextMenu}
            onClick={() => openSpace(space.id, adjacentSpaces)}
        >
            {displayValue()}
        </td>
    )
}

// const areEqual = (prevProps, nextProps) => {
//     if (prevProps.space.isOpen === nextProps.space.isOpen)
//         return true
    
//     return false
// }

export default Space;