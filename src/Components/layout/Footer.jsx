import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { Foot, FlagText, OpenText, ToggleContainer } from "../../Styles";
import Toggle from "../core/Toggle";
import { GameContext } from "../../Context/GameContext";

const Footer = () => {
  const { mode } = useContext(GameContext);
  return (
    <Foot>
      <FaArrowLeft />
      <ToggleContainer>
        <FlagText selected={mode === "flag"}>flag</FlagText>
        <Toggle />
        <OpenText selected={mode === "open"}>open</OpenText>
      </ToggleContainer>
    </Foot>
  );
};

export default Footer;
