import Player from "./assets/PlayerInfo.jsx";
function App() {
  return (
    <>
      <div id="game-container">
        <ol id="players">
          <Player name="Player 1" sym="X" />
          <Player name="Player 2" sym="0" />
        </ol>
      </div>
      <div></div>
    </>
  );
}

export default App;
