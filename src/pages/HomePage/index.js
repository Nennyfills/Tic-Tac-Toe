import React, { Component } from 'react';

import Square from 'components/Square';
import Button from 'components/Button';
import Box from 'components/Box';

/**
 * @exports
 * @class HomePage
 * @extends Component
 * @classdesc Creates HomePage Component
 *
 * @returns {JSX} HomePage Component
 */
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winCombination: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ],
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      hide: false,
      gameWin: null,
      tie: null,
      human: 'x',
      computer: 'o',
    };
  }

  startGame = (index) => {
    const { board, gameWin } = this.state;
    if (!gameWin) {
      if (typeof board[index] === 'number') {
        this.takeTurn(index);
      }
    }
  }

  takeTurn = (index) => {
    const { board, human, computer } = this.state;
    this.turn(index, human);

    if (!this.checkWinner(board, human) && !this.checkTie()) this.turn(this.findSpot(), computer);
  }

  turn = (index, player) => {
    const { board } = this.state;
    const newBoard = board;
    newBoard[index] = player;
    this.setState({
      board: newBoard,
    });
    const gameWin = this.checkWinner(newBoard, player);
    if (gameWin) this.gameOver(gameWin);
  }

  gameOver = (gameWin) => {
    this.setState({
      hide: true
    });
    this.identifyWinner(gameWin);
  }

  checkWinner = (board, player) => {
    const { winCombination } = this.state;
    const playNums = board.reduce((accumulator, currentIndex, index) => ((currentIndex === player)
      ? accumulator.concat(index) : accumulator), []);
    let gameWin = null;

    for (const [index, combo] of winCombination.entries()) {
      if (combo.every((element) => playNums.indexOf(element) > -1)) {
        gameWin = { index, player };
        break;
      }
    }
    return gameWin;
  }

  renderSquare = () => {
    const { board } = this.state;
    const fillBoard = board.map((value, index) => (
      <Square
        key={index}
        value={value}
        onClick={() => this.startGame(index)}
      />
    ));
    return fillBoard;
  }

  replay = () => {
    this.setState({
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      hide: false,
      gameWin: null,
      tie: null,
    });
  }

  identifyWinner= (gameWin) => {
    if (gameWin.player === 'x') {
      this.setState({
        gameWin: 'X'
      });
    } else if (gameWin.player === 'o') {
      this.setState({
        gameWin: 'O'
      });
    }
  }

  getEmpty = () => {
    const { board } = this.state;
    const newBoard = board.filter((value) => typeof value === 'number');
    return newBoard;
  }

  findSpot = () => {
    const { computer, board } = this.state;
    return this.unbeatableAI(board, computer).index;
  }

  checkTie = () => {
    if (this.getEmpty().length === 0) {
      this.setState({
        tie: 'There is a tie',
        hide: true
      });
    }
  }

  unbeatableAI = (newBoard, player) => {
    const { computer, human } = this.state;
    const availableSpot = this.getEmpty();

    const moves = [];
    let bestMove;

    if (this.checkWinner(newBoard, human)) {
      return { score: -10 };
    } if (this.checkWinner(newBoard, computer)) {
      return { score: 10 };
    } if (availableSpot.length === 0) {
      return { score: 0 };
    }
    for (let value = 0; value < availableSpot.length; value += 1) {
      const move = {};
      move.index = newBoard[availableSpot[value]];

      newBoard[availableSpot[value]] = player;
      if (player === computer) {
        const result = this.unbeatableAI(newBoard, human);
        move.score = result.score;

        move.score = result.score;
      } else {
        const result = this.unbeatableAI(newBoard, computer);
        move.score = result.score;
      }
      newBoard[availableSpot[value]] = move.index;
      moves.push(move);
    }

    if (player === computer) {
      let bestScore = -10000;
      for (let value = 0; value < moves.length; value += 1) {
        if (moves[value].score > bestScore) {
          bestScore = moves[value].score;
          bestMove = value;
        }
      }
    } else {
      let bestScore = 10000;
      for (let value = 0; value < moves.length; value += 1) {
        if (moves[value].score < bestScore) {
          bestScore = moves[value].score;
          bestMove = value;
        }
      }
    }
    return moves[bestMove];
  }

  render() {
    const {
      hide, gameWin, tie
    } = this.state;
    console.log(tie);

    const showGameOver = !hide ? 'hide' : '';
    const result = tie === null ? `winner is ${gameWin}` : tie;
    return (
      <div id="inner">
        <h1>Tic Tac Toe</h1>
        <div>
          <Button
            value="Replay"
            onClick={this.replay}
          />
        </div>
        <div className="board">
          {this.renderSquare()}
        </div>
        <div className={`inner__end-game ${showGameOver}`}>
          <Box value={`Game Over: ${result}`} />
        </div>
      </div>
    );
  }
}

export default HomePage;
