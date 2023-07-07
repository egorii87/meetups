import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('render Loader', () => {
  it('checking the display', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
