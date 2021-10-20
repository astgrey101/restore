import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import ShopHeader from '../../components/shop-header';
import '@testing-library/jest-dom';

describe('Shop header component tests', () => {
  test('Test shop header display', () => {
    render(
      <BrowserRouter>
        <ShopHeader numItems={5} total={100} />
      </BrowserRouter>,
    );
    waitFor(() => screen.getByText('ReStore'));
    expect(screen.getByText('Books Catalog')).toHaveTextContent('Books Catalog');
    expect(screen.getByTestId('link-to-shopping-cart')).toHaveTextContent('items');
    expect(screen.getByTestId('link-to-shopping-cart')).toHaveTextContent('($100)');
    expect(screen.getByTestId('link-to-shopping-cart')).toHaveTextContent('5 items');
  });
});
