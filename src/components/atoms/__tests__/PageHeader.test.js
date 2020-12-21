import React from 'react';
import PageHeader from 'components/atoms/PageHeader/PageHeader';
import { render } from 'test-utils';

describe('PageHeader', () => {
  test('renders text propertly', () => {
    const { getByText } = render(<PageHeader title="Wishlist" />);
    const Heading = getByText(/Wishlist/i);
    expect(Heading).toBeInTheDocument();
  });
});
