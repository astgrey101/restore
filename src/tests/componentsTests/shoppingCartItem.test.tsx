import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import RequestStatus from '../../services/requestStatus';
import ShoppingBookCartItem from '../../components/shopping-book-cart-item';

const testBook = {
  id: 1,
  title: 'Consectetur quis in minim dolor cupidatat eu nulla nostrud ex ad minim aute.',
  author: 'Castaneda Dillon',
  price: 293,
  coverImage: 'http://lorempixel.com/300/500/transport/8/',
};

const testCartItem = {
  1: {
    id: 1,
    amount: 1,
  },
};

const mockStore = configureMockStore([thunk]);
let myStore: MockStoreEnhanced<unknown>;
beforeEach(() => {
  myStore = mockStore({
    bookList: {
      books: [testBook],
      loading: false,
      error: null,
      status: RequestStatus.FULFILLED,
    },
    shoppingCart: {
      cartItems: testCartItem,
    },
  });
});

describe('Shopping Cart Item tests', () => {
  test('Shopping Cart Item display test', async () => {
    render(
      <Provider store={myStore}>
        <ShoppingBookCartItem item={testCartItem['1']} idx={0} />
      </Provider>,
    );
    await expect(screen.getByTestId('item-amount-1')).toHaveTextContent(`${testCartItem['1'].amount}`);
    await expect(screen.getByTestId('item-price-1')).toHaveTextContent(`${testCartItem['1'].amount * testBook.price}`);
    await expect(screen.getByTestId('item-title-1')).toHaveTextContent(testBook.title);
    await expect(screen.getByTestId('item-all-remove-btn-1')).toBeDefined();
    await expect(screen.getByTestId('item-remove-btn-1')).toBeDefined();
    await expect(screen.getByTestId('item-add-btn-1')).toBeDefined();
  });

  // test('Shopping Cart Add and Remove One Item test', async () => {
  //   render(
  //     <Provider store={myStore}>
  //       <ShoppingBookCartItem item={testCartItem['1']} idx={0} />
  //     </Provider>,
  //   );
  //   await act(
  //     async () => {
  //       await waitFor(() => screen.getByTestId('item-add-btn-1'));
  //       await waitFor(() => fireEvent.click(screen.getByTestId('item-add-btn-1')));
  //     },
  //   );
  //   await act(
  //     async () => {
  //       await waitFor(() => screen.getByTestId('item-add-btn-2'));
  //       await expect(screen.getByTestId('item-amount-1'))
  //         .toHaveTextContent(`${testCartItem['1'].amount + 1}`);
  //       await expect(screen.getByTestId('item-price-1'))
  //         .toHaveTextContent(`$${(testCartItem['1'].amount + 1) * testBook.price}`);
  //     },
  //   );
  // });
});
