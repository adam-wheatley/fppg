import React from 'react';
import PropTypes from 'prop-types';
import { Container, PlayerImage } from './styles';

const PlayerCard = ({ player, selected, submitted, selectPlayer }) => (
  <Container data-at="player-card" onClick={selectPlayer} selected={selected}>
    <h2 data-at="player-name">{player.first_name}</h2>
    <PlayerImage
      data-at="player-img"
      src={player.images.default.url}
      alt={`${player.first_name.toLowerCase()}-avatar`}
    />
    {submitted && (
      <h3 data-at="fanduel-points">Fanduel Points: {player.fppg.toString()}</h3>
    )}
  </Container>
);

PlayerCard.defaultProps = {
  selected: false,
  submitted: false
};

PlayerCard.propTypes = {
  player: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    images: PropTypes.shape({
      default: PropTypes.shape({
        url: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,
    fppg: PropTypes.number.isRequired
  }).isRequired,
  selected: PropTypes.bool,
  submitted: PropTypes.bool,
  selectPlayer: PropTypes.func.isRequired
};

export default PlayerCard;
