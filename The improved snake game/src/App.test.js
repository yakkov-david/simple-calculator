import { render, screen } from '@testing-library/react';
import App from './App';
import GameBoard from './SnakeGame/GameBoard/GameBoard';

test('renders learn react link', () => {
  render(<GameBoard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
