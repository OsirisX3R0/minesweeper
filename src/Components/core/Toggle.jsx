import React, { useContext } from "react";
import { SwitchOuter, SwitchInput, SwitchSlider } from "../../Styles";
import { GameContext } from "../../Context/GameContext";

const Toggle = () => {
  const { mode, setMode } = useContext(GameContext);
  return (
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
  );
};

export default Toggle;
