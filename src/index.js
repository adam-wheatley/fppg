import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import * as serviceWorker from "./serviceWorker";
import GlobalStyle from "./styles/global";
import theme from './styles/theme';
import GameState from "./context/GameState";
import Game from "./Game";

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
