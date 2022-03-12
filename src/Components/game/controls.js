import React, { useContext } from "react";

import { GameContext } from "../../Context/GameContext";
import { StartButton, ControlGrid, Input, Item, Label } from "../../Styles";

const Controls = () => {
  const { rows, setRows, cols, setCols, mines, setMines, grid, generateBoard } =
    useContext(GameContext);

  const displayControls = !grid.length && (
    <ControlGrid>
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
      <Item full>
        <StartButton onClick={() => generateBoard()}>Start Game</StartButton>
      </Item>
    </ControlGrid>
  );

  return displayControls;
};

export default Controls;
