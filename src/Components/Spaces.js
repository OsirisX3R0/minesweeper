import React, { useContext } from 'react'

import {GameContext} from '../Context/GameContext'
import { BoardContainer, BoardBody, BoardRow } from '../Styles'
import Space from './Space'

const Spaces = () => {
    const { gameBoard, width } = useContext(GameContext)

    console.log('Spaces rendered')

    return (
        <BoardContainer>
            <BoardBody width={width}>
                {gameBoard.map((row, rowIndex) => {
                    return (
                        // <BoardRow key={rowIndex}>
                            row.map(space => {
                                return <Space 
                                    space={space}
                                    key={space.id} 
                                />
                            })
                        // </BoardRow>
                    )
                })}
            </BoardBody>
        </BoardContainer>
    )
}

export default Spaces