import React from 'react';
import { render } from '@testing-library/react';
import Card from './index';

describe('Card', () => {
  it('should render correctly when multiple items are provided', () => {
    const { container } = render(
      <Card title='卡片标题'>
        <div>Item1</div>
        <div>Item2</div>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
  it('should render correctly when only one item is provided', () => {
    const { container } = render(
      <Card title='卡片标题'>
        <div>Item1</div>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});

