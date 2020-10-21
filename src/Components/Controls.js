import React, { useContext } from 'react'

import { GameContext } from '../Context/GameContext'

const Controls = () => {
    const {
        width, 
        setWidth,
        height, 
        setHeight,
        mines, 
        setMines,
        gameStarted,
        generateBoard
    } = useContext(GameContext)

    const displayControls = !gameStarted && (
        <>
            <h1>Minesweeper</h1>
            <div className="grid">
                <div className="item">
                    <label>Width</label>
                    <input type="number" 
                        value={width}  
                        onChange={(e) => setWidth(+e.target.value)} />
                </div>
                <div className="item">
                    <label>Height</label>
                    <input type="number" 
                        value={height}
                        onChange={(e) => setHeight(+e.target.value)} />
                </div>
                <div className="item">
                    <label># of Mines</label>
                    <input type="number" 
                        value={mines}
                        onChange={(e) => setMines(+e.target.value)} />
                </div>
                <div className="item">
                    <button onClick={generateBoard}>Start Game</button>
                </div>
            </div>
        </>
    )

    return displayControls
}

export default Controls;