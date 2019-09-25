import React from "react";
import { Container, PlayerImage } from './styles';

const PlayerCard = ({ player, selected, submitted, selectPlayer }) => (
  <Container onClick={selectPlayer} selected={selected}>
    <h2>{player.first_name}</h2>
    <PlayerImage src={player.images.default.url} alt={`${player.first_name.toLowerCase()}-avatar`} />
    {submitted && <h3>Fanduel Points: {player.fppg.toString()}</h3>}
  </Container>
);

export default PlayerCard;
