import React, { useContext } from "react";

import { Foot, FlagText, OpenText } from "../../Styles";
import Toggle from "../core/Toggle";
import { GameContext } from "../../Context/GameContext";

const Footer = () => {
  const { mode } = useContext(GameContext);
  return (
    <Foot>
      <FlagText selected={mode === "flag"}>flag</FlagText>
      <Toggle />
      <OpenText selected={mode === "open"}>open</OpenText>
    </Foot>
  );
};

export default Footer;
