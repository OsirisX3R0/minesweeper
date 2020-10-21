import React, { useContext, useCallback } from 'react'

import {GameContext} from '../Context/GameContext'
import Space from './Space'

const Spaces = () => {
    const { gameBoard } = useContext(GameContext)

    console.log('Spaces rendered')

    return (
        <table>
            <tbody>
                {gameBoard.map((row, rowIndex) => {
                    return (
                        <tr key={rowIndex}>
                            {row.map(space => {
                                return <Space 
                                    space={space}
                                    key={space.id} 
                                />
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Spaces