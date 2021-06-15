import React from 'react';
import { render, screen } from '@testing-library/react';
import { fireClickEvent } from 'setupTests';
import PageHeader from './index';

const mockedHistory = {
  goBack: jest.fn()
}

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => mockedHistory
  }
})

describe('PageHeader', () => {
  it('should render correctly when show back button', () => {
    const { container } = render(
      <PageHeader title='HeaderTitle' showBackButton>
        <div>Header children</div>
      </PageHeader>
    );
    expect(container).toMatchSnapshot();
  });
  it('should navigate back when back button is clicked', () => {
    render(
      <PageHeader title='HeaderTitle' showBackButton>
        <div>Header children</div>
      </PageHeader>
    );
    let imgIcon = screen.getByAltText(/arrowLeftIcon/i);
    fireClickEvent(imgIcon);
    expect(mockedHistory.goBack).toBeCalled();
  });
  it('should render correctly when not show back button', () => {
    const { container } = render(
      <PageHeader title='HeaderTitle' showBackButton={false}>
        <div>Header children</div>
      </PageHeader>
    );
    expect(container).toMatchSnapshot();
  });
});


