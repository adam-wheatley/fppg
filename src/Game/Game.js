import React, { useContext, useState } from "react";
import GameContext from "../context/game-context";
import PlayerCard from "./PlayerCard";

const Game = () => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(false);
  const [canSubmit, setCanSubmitState] = useState(false);
  const [submitted, setSubmittedState] = useState(false);
  const [result, setResult] = useState(false);

  const {
    loading,
    error,
    players,
    score,
    incrementScore,
    resetGame
  } = useContext(GameContext);

  const nextAttempt = () => {
    setCanSubmitState(false);
    setSelectedPlayer(false);
    setSubmittedState(false);
    setResult(false);
    setPlayerIndex(playerIndex + 2);
  };

  const selectPlayer = i => {
    if (!canSubmit) {
      setCanSubmitState(true);
    }

    if (!submitted) {
      setSelectedPlayer(i);
    }
  };

  const isCorrect = () => {
    if (
      selectedPlayer % 2 == 0 &&
      players[selectedPlayer].fppg > players[selectedPlayer + 1].fppg
    ) {
      return true;
    } else if (
      players[selectedPlayer].fppg > players[selectedPlayer - 1].fppg
    ) {
      return true;
    }

    return false;
  };

  const confirmAnswer = () => {
    setSubmittedState(true);
    if (isCorrect()) {
      setResult(true);
      incrementScore();
    }
  };

  const playAgain = () => {
    setCanSubmitState(false);
    setSelectedPlayer(false);
    setSubmittedState(false);
    setResult(false);
    setPlayerIndex(0);
    resetGame();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        There seem's to have been an error. Please refresh you're browser and
        try again.
      </div>
    );
  }

  return (
    <div>
      Score: {score.toString()}
      {score < 10 ? (
        <React.Fragment>
          {submitted && <div>{result ? "Correct" : "Incorrect"}</div>}
          <PlayerCard
            selectPlayer={() => selectPlayer(playerIndex)}
            player={players[playerIndex]}
            selected={selectedPlayer === playerIndex}
            submitted={submitted}
          />
          <PlayerCard
            selectPlayer={() => selectPlayer(playerIndex + 1)}
            player={players[playerIndex + 1]}
            selected={selectedPlayer === playerIndex + 1}
            submitted={submitted}
          />
          <button disabled={!(canSubmit && !submitted)} onClick={confirmAnswer}>
            Confirm
          </button>
          <button disabled={!submitted} onClick={nextAttempt}>
            Next
          </button>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div>
            <h1>Congratulations! You Won!</h1>
            <button onClick={playAgain}>Play Again</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Game;
