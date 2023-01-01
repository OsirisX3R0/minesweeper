import React, { useContext } from "react";
import { SwitchOuter, SwitchInput, SwitchSlider } from "../../Styles";
import { GameContext } from "../../Context/GameContext";

const Toggle = () => {
  const { setMode,isOpenMode } = useContext(GameContext);
  return (
    <SwitchOuter>
      <SwitchInput
        type="checkbox"
        checked={isOpenMode}
        onChange={() =>
          setMode((prevMode) => (prevMode === "open" ? "flag" : "open"))
        }
      />
      <SwitchSlider checked={isOpenMode} />
    </SwitchOuter>
  );
};

export default Toggle;
