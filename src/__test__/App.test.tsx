import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import App from '../App'

let component: RenderResult<typeof import("@testing-library/dom/types/queries")>;

beforeEach(() => {
  component = render(<App />);
})

test('test it renders app title', () => {
  const headingElement = screen.getByText(/nasa's picture of the day/i);
  expect(headingElement).toBeInTheDocument();
});

it('should render without throwing an error', () => {
  expect(component).toMatchSnapshot()
})
