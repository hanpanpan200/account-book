import React from 'react';
import { render } from '@testing-library/react';
import { fireClickEvent } from 'setupTests';
import BottomButtonGroup from './index';

describe('BottomButtonGroup', () => {
  const mockedOnCancel = jest.fn();
  const mockedOnConfirm = jest.fn();

  it('should render correctly', () => {
    const { container } = render(<BottomButtonGroup onCancel={mockedOnCancel} onConfirm={mockedOnConfirm} />);
    expect(container).toMatchSnapshot();
  });

  it('should trigger onCancel and onConfirm successfully when buttons are clicked', () => {
    const { getByText } = render(<BottomButtonGroup onCancel={mockedOnCancel} onConfirm={mockedOnConfirm} />);
    const cancelButton = getByText('取消');
    const confirmButton = getByText('确定');
    fireClickEvent(cancelButton);
    expect(mockedOnCancel).toBeCalled();
    fireClickEvent(confirmButton);
    expect(mockedOnConfirm).toBeCalled();
  });
});

