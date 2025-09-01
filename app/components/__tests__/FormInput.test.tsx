import { render, screen } from '@testing-library/react';
import { FormInput } from '../FormInput';

describe('FormInput', () => {
  it('renders input with label and passes props', () => {
    render(
      <FormInput
        id="test-input"
        label="Test Label"
        value="abc"
        onChange={() => {}}
        errorId="err1"
      />,
    );
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('aria-describedby', 'err1');
  });
});
