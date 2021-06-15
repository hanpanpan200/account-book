// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';

export const fireClickEvent = (element: Document | Element | Window | Node) => {
  fireEvent(element, new MouseEvent('click', {
    bubbles: true,
    cancelable: true
  }));
}