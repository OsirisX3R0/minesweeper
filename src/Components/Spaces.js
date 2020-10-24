import React, { useContext } from 'react'

import { GameContext } from '../Context/GameContext'
import { BoardTable, BoardBody, BoardRow } from '../Styles'
import Space from './Space'

const Spaces = () => {
    const { gameBoard, width } = useContext(GameContext)

    console.log('Spaces rendered')

    return (
        <BoardTable>
            <BoardBody width={width}>
                {gameBoard.map((row, rowIndex) => (
                    <BoardRow key={rowIndex}>
                        {row.map(space => (
                            <Space 
                                space={space}
                                key={space.id} 
                            />
                        ))}
                    </BoardRow>
                ))}
            </BoardBody>
        </BoardTable>
    )
}

export default Spaces