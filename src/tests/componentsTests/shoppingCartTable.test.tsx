import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import RequestStatus from '../../services/requestStatus';
import ShoppingCartTable from '../../components/shopping-cart-table';

const testBook1 = {
  id: 1,
  title: 'Consectetur quis in minim dolor cupidatat eu nulla nostrud ex ad minim aute.',
  author: 'Castaneda Dillon',
  price: 293,
  coverImage: 'http://lorempixel.com/300/500/transport/8/',
};

const testBook2 = {
  title: 'In est exercitation minim fugiat dolor minim sunt tempor.',
  author: 'Theresa Farley',
  price: 244,
  coverImage: 'http://lorempixel.com/300/500/transport/4/',
  id: 2,
};

const testCartItem = {
  1: {
    id: 1,
    amount: 1,
  },
  2: {
    id: 2,
    amount: 1,
  },
};

const mockStore = configureMockStore([thunk]);
let myStore: MockStoreEnhanced<unknown>;
beforeEach(() => {
  myStore = mockStore({
    bookList: {
      books: [testBook1, testBook2],
      loading: false,
      error: null,
      status: RequestStatus.FULFILLED,
    },
    shoppingCart: {
      cartItems: testCartItem,
    },
  });
});

describe('Shopping Cart Table tests', () => {
  test('Shopping Cart Table display with items test', async () => {
    render(
      <Provider store={myStore}>
        <ShoppingCartTable />
      </Provider>,
    );
    await expect(screen.getByTestId('item-title-1')).toHaveTextContent(testBook1.title);
    await expect(screen.getByTestId('item-amount-1')).toHaveTextContent(`${testCartItem['1'].amount}`);
    await expect(screen.getByTestId('item-price-1')).toHaveTextContent(`${testCartItem['1'].amount * testBook1.price}`);
    await expect(screen.getByTestId('item-title-2')).toHaveTextContent(testBook2.title);
    await expect(screen.getByTestId('item-amount-2')).toHaveTextContent(`${testCartItem['2'].amount}`);
    await expect(screen.getByTestId('item-price-2')).toHaveTextContent(`${testCartItem['2'].amount * testBook2.price}`);
    await expect(screen.getByTestId('shopping-cart-total'))
      .toHaveTextContent(`${testCartItem['2'].amount * testBook2.price + testCartItem['1'].amount * testBook1.price}`);
  });
});
