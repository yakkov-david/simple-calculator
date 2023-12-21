import React from 'react';
import './Snake.css';
import { BOARD_SIZE, CELL_SIZE, INITIAL_SNAKE_POSITION, INITIAL_SPEED, SNAKE_COLOR, APPLE_COLOR } from '../constants';


const Snake = ({ snakeSegments, snakeColor }) => {
  return (
    <>
      {snakeSegments.map((segment, index) => (
        <div key={index} className="snake-segment" style={{ left: `${segment.x * CELL_SIZE}px`, top: `${segment.y * CELL_SIZE}px`, backgroundColor: snakeColor }}></div>
      ))}
    </>
  );
};

export default Snake;
