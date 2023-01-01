import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { Foot, FlagText, OpenText, ToggleContainer } from "../../Styles";
import Toggle from "../core/Toggle";
import { GameContext } from "../../Context/GameContext";

const Footer = () => {
  const { mode, boardState } = useContext(GameContext);

  const footer = boardState !== null ? (
    <Foot>
      <FaArrowLeft />
      <ToggleContainer>
        <FlagText selected={mode === "flag"}>flag</FlagText>
        <Toggle />
        <OpenText selected={mode === "open"}>open</OpenText>
      </ToggleContainer>
    </Foot>
  ) : null;

  return footer
};

export default Footer;
