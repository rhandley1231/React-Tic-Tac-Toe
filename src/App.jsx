import { useState, Fragment } from "react";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";

function App() {
  return (
    <main>
      <div id="game-container">
        {/* Players section */}
        <ol id="players">
          <Player initialName='Player 1' symbol="X"/>
          <Player initialName='Player 2' symbol='O'/> 
        </ol>
        {/* Game board section */}
        <GameBoard />
      </div>
      {/* */}
    </main>
  );
}

export default App;
