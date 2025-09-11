import { render, screen } from '@testing-library/react';
import { FormError } from '../FormError';

describe('FormError', () => {
  it('renders nothing if no error', () => {
    const { container } = render(<FormError error={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders error message with role alert and id', () => {
    render(<FormError error="Test error" id="err1" />);
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Test error');
    expect(error).toHaveAttribute('id', 'err1');
  });
});
