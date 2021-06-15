import React from 'react';
import { render } from '@testing-library/react';
import HorizontalSplitter from './index';

describe('HorizontalSplitter', () => {
  it('should render correctly', () => {
    const { container } = render(<HorizontalSplitter />);
    expect(container).toMatchSnapshot();
  });
});
