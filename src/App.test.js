import { render, screen } from '@testing-library/react';
import CheckoutPage from './CheckoutPage';

test('renders learn react link', () => {
  render(<CheckoutPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
