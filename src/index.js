import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import GameState from './context/GameState';
import Game from './Game';

ReactDOM.render(
    <GameState>< Game /></GameState>
, document.getElementById('root'));

serviceWorker.unregister();
