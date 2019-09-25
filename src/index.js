import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import * as serviceWorker from "./serviceWorker";
import GlobalStyle from "./styles/global";
import GameState from "./context/GameState";
import Game from "./Game";

const theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GameState>
      <Normalize />
      <GlobalStyle />
      <Game />
    </GameState>
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
