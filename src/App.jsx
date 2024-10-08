import { useState } from "react";
import Player from "./assets/Components/PlayerInfo.jsx";
import GameBoard from "./assets/Components/GameBoard.jsx";
import Log from "./assets/Components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winningCombinations.js";
import GameOver from "./assets/Components/GameOver.jsx";
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveWinner(gameBoard, name) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstCell = gameBoard[combination[0].row][combination[0].column];
    const secondCell = gameBoard[combination[1].row][combination[1].column];
    const thirdCell = gameBoard[combination[2].row][combination[2].column];
    if (firstCell && firstCell === secondCell && firstCell === thirdCell) {
      winner = name[firstCell];
    }
  }
  return winner;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [name, setname] = useState({
    X: "player 1",
    O: "Player 2",
  });
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, name);
  const draw = gameTurns.length === 9 && !winner;
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
  function restart() {
    setGameTurns([]);
  }
  function handleName(symbol, name) {
    setname((oldName) => {
      return { ...oldName, [symbol]: name };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleName}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleName}
          />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRestart={restart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
export default App;
