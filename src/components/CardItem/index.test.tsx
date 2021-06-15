import React from 'react';
import { render } from '@testing-library/react';
import CardItem from './index';

describe('CardItem', () => {
  it('should render correctly when title and description are provided as string', () => {
    const { container } = render(<CardItem iconSource='icon.svg' title='标题' description='描述' content='内容' />);
    expect(container).toMatchSnapshot();
  });
  it('should render correctly when title and description are provided as component', () => {
    const { container } =
      render(<CardItem iconSource='icon.svg' title={<div>hello</div>} description={<div>world</div>} content='内容' />);
    expect(container).toMatchSnapshot();
  });
});
