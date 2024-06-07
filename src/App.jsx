import { useState } from 'react';
import Player from './components/Player/Player.jsx';
import GameBoard from './components/GameBoard/GameBoard.jsx';
import GameLog from './components/GameLog/GameLog.jsx';
import GameOver from './components/GameOver/GameOver.jsx';
import { WINNING_COMBINATIONS } from './winning-combos.js';
//We took the conditional statement from handleSelectSquare and made it a separate helper function
//We are now deriving the state

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  //Here we are deriving the state as opposed to computing it
  //Its a best practice to manage less states and derive more from existing states

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combo of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column];
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column];
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  /*Start with a defualt state set to player one's symbol
   *Here, we lift the state for the activePlayer, which needed in both the Player and GameBoard Components
   *This allows the child to initiate the state change, and the ancenstor component (in this case the App component)
   *to listen to the state change and update accordingly across the components
   */
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS)

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  //Here, we are deriving the state for the activePlayer
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        {/* Players section */}
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerName}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        {/* Game board section */}
        <GameBoard onTurn={handleSelectSquare} board={gameBoard} />
      </div>
      {/*Another Component where the state is lifted up is our GameLog Component*/}
      <GameLog turns={gameTurns} />
    </main>
  );
}

export default App;
