import React, { useContext } from "react";

import { GameContext } from "../../Context/GameContext";
import { Button, Grid, Header, Input, Item, Label } from "../../Styles";

const Controls = () => {
  const { rows, setRows, cols, setCols, mines, setMines, grid, generateBoard } =
    useContext(GameContext);

  const displayControls = !grid.length && (
    <Grid>
      <Item>
        <Label>Width</Label>
        <Input
          type="number"
          value={rows}
          onChange={(e) => setRows(+e.target.value)}
        />
      </Item>
      <Item>
        <Label>Height</Label>
        <Input
          type="number"
          value={cols}
          onChange={(e) => setCols(+e.target.value)}
        />
      </Item>
      <Item>
        <Label># of Mines</Label>
        <Input
          type="number"
          value={mines}
          onChange={(e) => setMines(+e.target.value)}
        />
      </Item>
      <Item>
        <Button onClick={() => generateBoard()}>Start Game</Button>
      </Item>
    </Grid>
  );

  return displayControls;
};

export default Controls;
