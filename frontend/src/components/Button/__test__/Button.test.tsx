import { render, screen } from '@testing-library/react';
import { Button, ButtonVariant } from '../Button';

describe('render button', () => {
  it('testing the text in the button', () => {
    render(<Button variant={ButtonVariant.Secondary}>Test text</Button>);

    expect(screen.getByTestId('button')).toHaveTextContent('Test text');
  });
});
