import React, { useContext } from 'react'

import { GameContext } from '../Context/GameContext'
import { Button, Grid, Header, Input, Item, Label } from '../Styles'

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
            <Header>Minesweeper</Header>
            <Grid>
                <Item>
                    <Label>Width</Label>
                    <Input type="number" 
                        value={width}  
                        onChange={(e) => setWidth(+e.target.value)} />
                </Item>
                <Item>
                    <Label>Height</Label>
                    <Input type="number" 
                        value={height}
                        onChange={(e) => setHeight(+e.target.value)} />
                </Item>
                <Item>
                    <Label># of Mines</Label>
                    <Input type="number" 
                        value={mines}
                        onChange={(e) => setMines(+e.target.value)} />
                </Item>
                <Item>
                    <Button onClick={() => generateBoard()}>Start Game</Button>
                </Item>
            </Grid>
        </>
    )

    return displayControls
}

export default Controls;