import React from "react";
import { ToggleButton } from "../../Styles";

const Toggle = () => {
  return (
    <>
      <ToggleButton>!</ToggleButton>
      <ToggleButton>O</ToggleButton>
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
