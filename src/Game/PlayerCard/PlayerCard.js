import React from "react";

const PlayerCard = ({ player, selected, submitted, selectPlayer }) => (
  <div onClick={selectPlayer}>
    Player 1: {player.first_name}
    {selected && !submitted ? " Selected" : ""}
    {submitted && <span>{player.fppg.toString()}</span>}
  </div>
);

export default PlayerCard;
