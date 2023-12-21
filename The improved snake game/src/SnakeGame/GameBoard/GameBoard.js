import React, { useState, useEffect, useRef } from 'react';
import Snake from '../Snake/Snake'; // Adjust the path as necessary
import Apple from '../Apple/Apple'; // Adjust the path as necessary
import {
  BOARD_SIZE,
  CELL_SIZE,
  INITIAL_SNAKE_POSITION,
  INITIAL_SPEED,
  SNAKE_COLOR,
  APPLE_COLOR,
} from '../constants'; // Adjust the path as necessary
import './GameBoard.css'; // Your GameBoard specific styles

function GameBoard() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [snakeSegments, setSnakeSegments] = useState([INITIAL_SNAKE_POSITION]);
  const [hasGameStarted, setHasGameStarted] = useState(false);
  const [snakeColor, setSnakeColor] = useState(SNAKE_COLOR);
  const [appleColor, setAppleColor] = useState(APPLE_COLOR);
  const [isGamePaused, setIsGamePaused] = useState(false);

  const directionRef = useRef({ x: 0, y: -1 });
  const gameLoopRef = useRef(null);


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, []);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        if (directionRef.current.y !== 1) directionRef.current = { x: 0, y: -1 };
        break;
      case 'ArrowDown':
        if (directionRef.current.y !== -1) directionRef.current = { x: 0, y: 1 };
        break;
      case 'ArrowLeft':
        if (directionRef.current.x !== 1) directionRef.current = { x: -1, y: 0 };
        break;
      case 'ArrowRight':
        if (directionRef.current.x !== -1) directionRef.current = { x: 1, y: 0 };
        break;
      case 'Space':
        setIsGamePaused(prevState => !prevState);
        break;
      case 'Enter':
        if (!hasGameStarted || isGameOver) startGame();
        break;
      default:
        break;
    }
  };

  const getScoreIncrement = () => {
    switch (speed) {
      case 200: // Easy
        return 1;
      case 150: // Medium
        return 3;
      case 100: // Hard
        return 5;
      default:
        return 1; // Default to 1 if for some reason speed is not one of the known values
    }
  };  

  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
  };



  const getRandomApplePosition = () => {
    let newApplePosition;
    do {
      newApplePosition = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snakeSegments.some(segment => segment.x === newApplePosition.x && segment.y === newApplePosition.y));
    return newApplePosition;
  };

  const [applePosition, setApplePosition] = useState(getRandomApplePosition());

  const gameLoop = () => {
    if (isGameOver) return;

    setSnakeSegments(prevSegments => {
      const newSegments = [...prevSegments];
      const newSnakeHead = {
        x: prevSegments[0].x + directionRef.current.x,
        y: prevSegments[0].y + directionRef.current.y
      };

      // Check for collisions with walls or self
      if (newSnakeHead.x < 0 || newSnakeHead.y < 0 || newSnakeHead.x >= BOARD_SIZE || newSnakeHead.y >= BOARD_SIZE || newSegments.some(segment => segment.x === newSnakeHead.x && segment.y === newSnakeHead.y)) {
        setIsGameOver(true);
        return prevSegments;
      }

      // Check for apple collision
      if (newSnakeHead.x === applePosition.x && newSnakeHead.y === applePosition.y) {
        const scoreIncrement = getScoreIncrement();
        setScore(prevScore => prevScore + scoreIncrement);
        setApplePosition(getRandomApplePosition());
        setSnakeColor(appleColor); // Set the snake's color to the current apple color
        setAppleColor(getRandomColor()); // Set a new color for the apple
        // No need to remove the last segment to grow the snake
      } else {
        newSegments.pop();
      }

      newSegments.unshift(newSnakeHead);
      return newSegments;
    });

    gameLoopRef.current = setTimeout(gameLoop, speed);
  };

  useEffect(() => {
    // Restart the game loop when applePosition changes
    if (hasGameStarted) {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
      gameLoop();
    }
  }, [applePosition, hasGameStarted]);

  const startGame = () => {
    // Reset everything to initial states
    setIsGameOver(false);
    setScore(0);
    setSnakeSegments([INITIAL_SNAKE_POSITION]);
    setApplePosition(getRandomApplePosition());
    directionRef.current = { x: 0, y: -1 };
    setHasGameStarted(true);
  };

  return (
    <>
      <div className="game-container" style={{ width: BOARD_SIZE * CELL_SIZE, height: BOARD_SIZE * CELL_SIZE }}>
        <Snake snakeSegments={snakeSegments} snakeColor={snakeColor} />
        <Apple position={applePosition} appleColor={appleColor} />

        {isGameOver && (
          <div id="game-over-popup">
            <h2>Game Over</h2>
            <p>Your score: <span>{score}</span></p>
            <button onClick={startGame}>Restart</button>
          </div>
        )}

        <div id="score-board">
          Score: {score}
        </div>
      </div>

      {/* Control buttons placed outside the game container */}
      {!hasGameStarted && (
        <div className="game-controls">
          <button onClick={startGame}>Start Game</button>
          <div id="difficulty-level">
            <select value={speed} onChange={e => setSpeed(parseInt(e.target.value))}>
              <option value="200">Easy</option>
              <option value="150">Medium</option>
              <option value="100">Hard</option>
            </select>
          </div>
        </div>
      )}
    </>
  );
}

export default GameBoard;
