import React from "react";
import { createGlobalStyle } from "styled-components";

import Board from "./Components/board";
import { background, foreground } from "./Styles/variables";
import "./App.scss";

const App = () => {
  const GlobalStyles = createGlobalStyle`
      body, input, button {
          background-color: ${background};
          color: ${foreground};
          font-family: 'Spartan', sans-serif;
      }
  `;

  return (
    <>
      <GlobalStyles />
      <Board />
    </>
  );
};

export default App;
