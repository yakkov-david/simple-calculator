import React from 'react';
import './Apple.css';
import { CELL_SIZE } from '../constants';


const Apple = ({ position, appleColor }) => {
  return (
    <div className="apple" style={{ left: `${position.x * CELL_SIZE}px`, top: `${position.y * CELL_SIZE}px`, backgroundColor: appleColor }}></div>
  );
};

export default Apple;
