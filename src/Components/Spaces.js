import React, { useContext } from 'react'

import {GameContext} from '../Context/GameContext'
import { BoardBody, BoardRow, BoardTable } from '../Styles'
import Space from './Space'

const Spaces = () => {
    const { gameBoard } = useContext(GameContext)

    console.log('Spaces rendered')

    return (
        <BoardTable>
            <BoardBody>
                {gameBoard.map((row, rowIndex) => {
                    return (
                        <BoardRow key={rowIndex}>
                            {row.map(space => {
                                return <Space 
                                    space={space}
                                    key={space.id} 
                                />
                            })}
                        </BoardRow>
                    )
                })}
            </BoardBody>
        </BoardTable>
    )
}

export default Spaces