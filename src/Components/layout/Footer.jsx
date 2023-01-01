import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { Foot, FlagText, OpenText, ToggleContainer } from "../../Styles";
import Toggle from "../core/Toggle";
import { GameContext } from "../../Context/GameContext";

const Footer = () => {
  const { boardState, clearGame,isOpenMode, isFlagMode } = useContext(GameContext);

  const footer = boardState !== null ? (
    <Foot>
      <FaArrowLeft onClick={clearGame} />
      <ToggleContainer>
        <FlagText selected={isFlagMode}>flag</FlagText>
        <Toggle />
        <OpenText selected={isOpenMode}>open</OpenText>
      </ToggleContainer>
    </Foot>
  ) : null;

  return footer
};

export default Footer;
