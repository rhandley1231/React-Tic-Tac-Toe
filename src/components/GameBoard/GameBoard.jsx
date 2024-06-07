import './GameBoard.css';

export default function GameBoard({ onTurn, board }) {
  
  //Start with a defualt state set to the initial game board
  /*const [board, setBoard] = useState(initialBoard);

  //Here, we need to update the array immutably to correctly reflect state changes
  //This function takes a row and column index as parameters and creates a new array each time it is clicked
  //While maintaining the contents of the previous array
  function handleSelectTile(rowIndex, colIndex){
    setBoard((prevBoard) => {
      const newBoard = [...prevBoard.map(innerArray => [...innerArray])];
      newBoard[rowIndex][colIndex] = activeSymbol;
      return newBoard;
    });
    onTurn();
  }*/
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                {/* We need to use an anonymous function for this to work properly here
                We will also add a conditional statement dynamically to disable buttons which are occupied by a symbol*/}
                <button
                  onClick={() => onTurn(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
