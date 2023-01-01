import React, { useContext } from "react";

import { GameContext } from "../../Context/GameContext";
import {
  StartButton,
  ControlGrid,
  Select,
  Input,
  Item,
  Label,
} from "../../Styles";

const Controls = () => {
  const {
    difficulty,
    setDifficulty,
    rows,
    setRows,
    cols,
    setCols,
    mines,
    setMines,
    grid,
    generateBoard,
  } = useContext(GameContext);

  const sizeControls = difficulty === "custom" && (
    <>
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
    </>
  );

  const displayControls = !grid.length && (
    <ControlGrid>
      <Item full>
        <Label>Difficulty</Label>
        <Select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="custom">Custom</option>
        </Select>
      </Item>
      {sizeControls}
      <Item full>
        <StartButton onClick={() => generateBoard()}>Start Game</StartButton>
      </Item>
    </ControlGrid>
  );

  return displayControls;
};

export default Controls;
