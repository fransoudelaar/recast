import { render, screen } from '@testing-library/react';
import { Caption } from '../Caption';

describe('Caption', () => {
  it('renders nothing if caption is empty', () => {
    const { container } = render(<Caption caption="" />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders caption text', () => {
    render(<Caption caption="Hello world" />);
    expect(screen.getByText('Caption')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
