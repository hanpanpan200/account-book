import React from 'react';
import { render } from '@testing-library/react';
import ModalHeader, { TitlePosition } from './index';
import { fireClickEvent } from '../../setupTests';

describe('ModalHeader', () => {
  const mockedOnLeftClicked = jest.fn();
  const mockedOnRightClicked = jest.fn();

  it('should render correctly when left and right button are provided as string and titlePosition is Left', async () => {
    const { container, findByText } = render(
      <ModalHeader
        title='Modal Header Title'
        titlePosition={TitlePosition.Left}
        leftText='Left Button'
        rightText='Right Button'
        onLeftClick={mockedOnLeftClicked}
        onRightClick={mockedOnRightClicked}
      />);
    expect(container).toMatchSnapshot();
    const leftText = await findByText('Left Button');
    fireClickEvent(leftText);
    expect(mockedOnLeftClicked).toBeCalled();
    const rightText = await findByText('Right Button');
    fireClickEvent(rightText);
    expect(mockedOnRightClicked).toBeCalled();
  });
  it('should render correctly when left and right button are provided as icon and titlePosition is Center', async () => {
    const { container, findByAltText } = render(
      <ModalHeader
        title='Modal Header Title'
        titlePosition={TitlePosition.Center}
        leftIconSource='leftIcon.svg'
        rightIconSource='rightIcon.svg'
        onLeftClick={mockedOnLeftClicked}
        onRightClick={mockedOnRightClicked}
      />);
    expect(container).toMatchSnapshot();
    const leftIcon = await findByAltText('modalHeaderLeftIcon');
    fireClickEvent(leftIcon);
    expect(mockedOnLeftClicked).toBeCalled();
    const rightIcon = await findByAltText('modalHeaderRightIcon');
    fireClickEvent(rightIcon);
    expect(mockedOnRightClicked).toBeCalled();
  });
});
