import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './index';

describe('Header', () => {
  it('should render correctly', () => {
    render(<Header title='HeaderTitle' />);
    const titleElement = screen.getByText(/HeaderTitle/i);
    expect(titleElement).toBeInTheDocument();
  });
})

