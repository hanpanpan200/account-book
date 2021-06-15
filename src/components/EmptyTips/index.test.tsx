import React from 'react';
import { render } from '@testing-library/react';
import EmptyTips from './index';

describe('EmptyTips', () => {
  it('should render correctly', () => {
    const { container } = render(<EmptyTips guidance='暂时无记录' />);
    expect(container).toMatchSnapshot();
  });
});
