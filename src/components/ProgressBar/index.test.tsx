import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from './index';

describe('ProgressBar', () => {
  it('should render correctly', () => {
    const { container } = render(<ProgressBar percentage={80} />);
    expect(container).toMatchSnapshot();
  });
});
