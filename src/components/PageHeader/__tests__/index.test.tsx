import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeader from '../index';

describe('PageHeader', () => {
  it('should render correctly', () => {
    render(
      <PageHeader title='HeaderTitle' showBackButton>
        <div>Header children</div>
      </PageHeader>
    );
    const titleElement = screen.getByText(/HeaderTitle/i);
    expect(titleElement).toBeInTheDocument();
  });
});


