import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import StatusMessage from './components/StatusMessage';
import { calculateWinner } from './helper';

import './style/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

const App = () => {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const NewGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h2>
        TIC{' '}
        <span className={`${current.isXNext ? 'text-orange' : 'text-green'}`}>
          TAC
        </span>{' '}
        TOE
      </h2>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleClick={handleClick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={NewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start Game
      </button>
      <h2 style={{ fontWeight: 'normal' }}>Current Game History</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
};

export default App;
