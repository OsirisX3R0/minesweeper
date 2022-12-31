import React, { useContext } from "react";
import {
  ToggleButton,
  SwitchOuter,
  SwitchInput,
  SwitchSlider,
  FlagText,
  OpenText,
} from "../../Styles";
import { GameContext } from "../../Context/GameContext";

const Toggle = () => {
  const { mode, setMode } = useContext(GameContext);
  return (
    <>
      <FlagText selected={mode === "flag"}>flag</FlagText>
      <SwitchOuter>
        <SwitchInput
          type="checkbox"
          checked={mode === "open"}
          onChange={() =>
            setMode((prevMode) => (prevMode === "open" ? "flag" : "open"))
          }
        />
        <SwitchSlider checked={mode === "open"} />
      </SwitchOuter>
      <OpenText selected={mode === "open"}>open</OpenText>
    </>
  );
};

export default Toggle;
