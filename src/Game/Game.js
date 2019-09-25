import React, { useContext } from 'react'
import GameContext from '../context/game-context';

const Game = () => {
    const {
        loading,
        error,
        players,
    } = useContext(GameContext);

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>There seem's to have been an error. Please refresh you're browser and try again.</div>
    }
    
    return (
        <div>Players</div>
    );
}

export default Game
