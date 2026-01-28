import React, { useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [moveCount, setMoveCount] = useState(0);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const [playerX, setPlayerX] = useState("Player 1");
  const [playerO, setPlayerO] = useState("Player 2");
  const [editingNames, setEditingNames] = useState(true);

  const handleClick = (index) => {
    if (board[index] !== "" || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "x" : "o";
    setBoard(newBoard);

    const nextMoveCount = moveCount + 1;
    setMoveCount(nextMoveCount);
    setIsXTurn(!isXTurn);

    const result = checkWinner(newBoard);

    if (result) {
    setWinner(result);
    if (result === "x") setXWins(xWins + 1);
    else if (result === "o") setOWins(oWins + 1);
    return;
  }

  if (nextMoveCount === 9) {
    checkDraw(newBoard, result);
    setDraws(draws + 1);
  }
  };

  const checkWinner = (currentBoard) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        currentBoard[a] &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[b] === currentBoard[c]
      ) {
        return (currentBoard[a]);
      }
    }
    return null;
  };

  const checkDraw = (currentBoard, currentWinner) => {
    if (currentBoard.every(cell => cell !== "") && !currentWinner) {
      setWinner("draw");
      return;
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setWinner(null);
    setMoveCount(0);
  };

  const renderIcon = (value) => {
    if (value === "x") return <img src={cross_icon} alt="X" />;
    if (value === "o") return <img src={circle_icon} alt="O" />;
    return null;
  };

  const renderStatus = () => {
    if (winner === "draw") {
      return <h2 className="title">Empataram seus<span>Animais!</span></h2>;
    }
    if (winner) {
      const winnerName = winner === "x" ? playerX : playerO;
      const loserName = winner === "x" ? playerO : playerX;

      return (
        <h2 className="titleFinal">
          Parabéns{" "}
          <span className="winner-info">
            <img
              src={winner === "x" ? cross_icon : circle_icon}
              alt="Winner"
              className="icon winner-icon"
            />{" "}
            <span className={`player-name ${winner === "x" ? "player-x-name" : "player-o-name"}`}>{winnerName}</span>
          </span>
          , você é melhor que o{" "}
          <span className="loser-info">
            <img
              src={winner === "x" ? circle_icon : cross_icon}
              alt="Loser"
              className="icon loser-icon"
            />{" "}
            <span className={`player-name ${winner === "x" ? "player-o-name" : "player-x-name"}`}>{loserName}</span>
          </span>
        </h2>
      );
    }
    return (
      <h2 className="title">
        Jogo da Velha do <span>DoCtoR</span>
      </h2>
    );
  };

  return (
    <div className="container">
      {editingNames ? (
        <div className="name-container">
          <input
            type="text"
            placeholder="Player 1"
            value={playerX}
            onChange={(e) => setPlayerX(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Player 1") setPlayerX("");
            }}
            onBlur={(e) => {
              if (e.target.value.trim() === "") setPlayerX("Player 1");
            }}
            className="name-input"
          />
          <input
            type="text"
            placeholder="Player 2"
            value={playerO}
            onChange={(e) => setPlayerO(e.target.value)}
            onFocus={(e) => {
              if (e.target.value === "Player 2") setPlayerO("");
            }}
            onBlur={(e) => {
              if (e.target.value.trim() === "") setPlayerO("Player 2");
            }}
            className="name-input"
          />
          <button className="rename" onClick={() => setEditingNames(false)}>
            Confirm Names
          </button>
        </div>
      ) : (
        <button className="rename" onClick={() => {
          setPlayerX("Player 1");
          setPlayerO("Player 2");
          setOWins(0);
          setXWins(0);
          setDraws(0);
          setEditingNames(true);
        }}
        >
          Rename Players
        </button>
      )}

      <div className="scoreboard">
        <div className="score player-x-score">
          <img src={cross_icon} alt="X" className="icon" /> {playerX}: {xWins}
        </div>
        <div className="score player-o-score">
          <img src={circle_icon} alt="O" className="icon" /> {playerO}: {oWins}
        </div>
        <div className="score draws">
           Empates: {draws}
        </div>
      </div>

      {renderStatus()}

      <div className="board">
        {board.map((value, index) => (
          <div
            key={index}
            className="boxes"
            onClick={() => handleClick(index)}
          >
            {renderIcon(value)}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};
