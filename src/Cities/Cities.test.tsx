import React from 'react';
import { render, screen } from '@testing-library/react';
import Cities from './Cities';

test('renders learn react link', () => {
  render(<Cities onChange={(a) => {}} cities={[]} currentIndex={0} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
