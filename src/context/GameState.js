import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../utils/shuffle';
import GameContext from './game-context';

const GameState = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(process.env.REACT_APP_PLAYERS_API)
      .then(response => response.json())
      .then(data => {
        setPlayers(shuffle(data.players.filter(player => player.fppg)));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const resetScore = () => setScore(0);
  const incrementScore = () => setScore(score + 1);
  const resetGame = () => {
    setLoading(true);
    setScore(0);
    setPlayers(shuffle(players));
    setLoading(false);
  };

  return (
    <GameContext.Provider
      value={{
        loading,
        players,
        score,
        resetScore,
        incrementScore,
        error,
        resetGame
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

GameState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default GameState;
