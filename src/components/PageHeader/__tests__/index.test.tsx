import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../index';

describe('Header', () => {
  it('should render correctly', () => {
    render(<PageHeader title='HeaderTitle' />);
    const titleElement = screen.getByText(/HeaderTitle/i);
    expect(titleElement).toBeInTheDocument();
  });
})

