import React from 'react';
import { render } from '@testing-library/react';
import { fireClickEvent } from 'setupTests';
import MonthButton from './index';

describe('MonthButton', () => {
  const date = new Date(2021, 6, 15);
  const mockedOnClick = jest.fn();

  it('should render correctly when date is provided', () => {
    const { container } = render(<MonthButton date={date} onClick={mockedOnClick} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly when date is not provided', () => {
    const { container } = render(<MonthButton onClick={mockedOnClick} />);
    expect(container).toMatchSnapshot();
  });

  it('should trigger onClick when button is clicked', () => {
    const { container } = render(<MonthButton date={date} onClick={mockedOnClick} />);
    const divs = container.getElementsByTagName('div');
    expect(divs.length).toEqual(1);
    const divElement = divs.item(0) as Element;
    fireClickEvent(divElement);
    expect(mockedOnClick).toBeCalled();
  });
});


