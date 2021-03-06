import React, { useContext, useState } from 'react';
import Grid from 'styled-components-grid';
import GameContext from '../context/game-context';
import PlayerCard from './PlayerCard';
import { Container, ResultContainer, Button } from './styles';

const Game = () => {
  const [playerIndex, setPlayerIndex] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState(false);
  const [canSubmit, setCanSubmitState] = useState(false);
  const [submitted, setSubmittedState] = useState(false);
  const [result, setResult] = useState(false);
  const [nextLoading, setNextLoading] = useState(false);

  const {
    loading,
    error,
    players,
    score,
    incrementScore,
    resetGame
  } = useContext(GameContext);

  const nextAttempt = () => {
    setNextLoading(true);
    setCanSubmitState(false);
    setSelectedPlayer(false);
    setSubmittedState(false);
    setResult(false);
    setPlayerIndex(playerIndex + 2);
    setNextLoading(false);
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
    // eslint-disable-next-line eqeqeq
    if (selectedPlayer % 2 == 0) {
      return players[selectedPlayer].fppg > players[selectedPlayer + 1].fppg;
    }
    return players[selectedPlayer].fppg > players[selectedPlayer - 1].fppg;
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
        There seem&apos;s to have been an error. Please refresh you&apos;re
        browser and try again.
      </div>
    );
  }

  return (
    <Container>
      <h1>Guess the Higher Fanduel Point&apos;s Game!</h1>
      <h2 data-at="current-score">Current Score: {score.toString()}</h2>
      {score < 10 ? (
        <>
          {submitted && (
            <ResultContainer result={result.toString()}>
              <h4 data-at="result">{result ? 'Correct' : 'Incorrect'}</h4>
            </ResultContainer>
          )}
          {nextLoading ? (
            <div>Loading...</div>
          ) : (
            <Grid>
              <Grid.Unit size={{ xs: 1, md: 1 / 2 }}>
                <PlayerCard
                  selectPlayer={() => selectPlayer(playerIndex)}
                  player={players[playerIndex]}
                  selected={selectedPlayer === playerIndex}
                  submitted={submitted}
                />
              </Grid.Unit>
              <Grid.Unit size={{ xs: 1, md: 1 / 2 }}>
                <PlayerCard
                  selectPlayer={() => selectPlayer(playerIndex + 1)}
                  player={players[playerIndex + 1]}
                  selected={selectedPlayer === playerIndex + 1}
                  submitted={submitted}
                />
              </Grid.Unit>
            </Grid>
          )}

          {!submitted && (
            <Button
              data-at="confirm-answer-btn"
              color="#B2FF9E"
              disabled={!(canSubmit && !submitted)}
              onClick={confirmAnswer}
            >
              Confirm Answer
            </Button>
          )}
          {submitted && (
            <Button
              data-at="next-btn"
              color="#0F8B8D"
              disabled={!submitted}
              onClick={nextAttempt}
            >
              Next
            </Button>
          )}
        </>
      ) : (
        <div data-at="winners-message">
          <h1>Congratulations! You Won!</h1>
          <Button color="#B2FF9E" onClick={playAgain}>
            Play Again
          </Button>
        </div>
      )}
    </Container>
  );
};

export default Game;
