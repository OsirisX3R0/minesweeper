import React, { useContext } from "react";
import { ToggleButton } from "../../Styles";
import { GameContext } from "../../Context/GameContext";

const Toggle = () => {
  const { mode, setMode } = useContext(GameContext);
  return (
    <>
      <ToggleButton fill={mode === "open" || 0} onClick={() => setMode("flag")}>
        !
      </ToggleButton>
      <ToggleButton fill={mode === "flag" || 0} onClick={() => setMode("open")}>
        O
      </ToggleButton>
      {/* <span>flag</span>
      <SwitchOuter>
        <SwitchInput type="checkbox" checked={checked} />
        <SwitchSlider />
      </SwitchOuter>
      <span>open</span> */}
    </>
  );
};

export default Toggle;
