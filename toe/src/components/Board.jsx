import Square from "./Square";
import { useState } from "react";


export default function Board() {
 
  const [xIsNext, setXIsNext] = useState(true);

  //Creates an empty array of squares that holds 9 null values until filled with X or O's using useState to render the data and determine a winner in our calculate winner function
  const [squares, setSquares] = useState(Array(9).fill(null));
  const initialSquares = Array(9).fill(null);

  const winner = calculateWinner(squares);
  let status;
  if (winner === "tie") {
    status = "It's a tie!";
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  function handleClick(i) {
    //calculates if there is a winner OR if box is already prefilled, if so return
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    //xIsNext state to determine if it's X or O's turn
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    //Sets the square to X or O depending on the xIsNext state
    setSquares(nextSquares);
    //Sets xIsNext boolean value to the opposite of itself (true/false)
    setXIsNext(!xIsNext);
  }
  //Function to determine if there has been a winner based on winning conditions from our squares array and its values
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    //Added additional functions ot check for ties
    if (squares.every((square) => square !== null)) {
      return "tie";
    }
    return null;
  }

  //function to reset game our games 
  function restartGame() {
    setSquares(initialSquares);
    setXIsNext(true);
  }


  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {/* On first run we pass our props a null value for value and a handleclick function for our onsquareclick prop */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button onClick={restartGame}>Restart Game</button>
    </>
  );
}
