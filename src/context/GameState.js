import React, { useEffect, useState } from "react";

import GameContext from "./game-context";

const GameState = props => {
  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(false);

  const shuffleArray = a => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    fetch(process.env.REACT_APP_PLAYERS_API)
      .then(response => response.json())
      .then(data => {
        setPlayers(data.players);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
      });
  }, []);

  const resetScore = () => setScore(0);
  const incrementScore = () => setScore(score + 1);
  const resetGame = () => {
    setLoading(true);
    setScore(0);
    setPlayers(shuffleArray(players));
    setLoading(false);
  }

  return (
    <GameContext.Provider
      value={{
        loading,
        players,
        score,
        resetScore,
        incrementScore,
        error,
        resetGame,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameState;
