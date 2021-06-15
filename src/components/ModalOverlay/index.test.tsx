import React from 'react';
import { render } from '@testing-library/react';
import ModalOverlay from './index';

describe('ModalOverlay', () => {
  it('should render correctly when visible', () => {
    const { container } = render(
      <ModalOverlay visible>
        <div>Modal Content</div>
      </ModalOverlay>
    );
    expect(container).toMatchSnapshot();
  });
  it('should render correctly when invisible', () => {
    const { container } = render(
      <ModalOverlay visible={false}>
        <div>Modal Content</div>
      </ModalOverlay>
    );
    expect(container).toMatchSnapshot();
  });
});


