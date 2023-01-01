import React from "react";
import { FaRegSquare } from "react-icons/fa";

import useRemainingSpaces from "../../../Hooks/useRemainingSpaces";
import { MarginRight, Remaining } from "../../../Styles";

const Spaces = () => {
  const [remaining, total] = useRemainingSpaces();

  return (
    <Remaining>
      <MarginRight amount="0.25rem">
        <FaRegSquare />
      </MarginRight>
      {remaining}/{total}
    </Remaining>
  );
};

export default Spaces;
