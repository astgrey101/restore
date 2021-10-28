import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  render, waitFor, screen, fireEvent, act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import ShoppingBookCartItem from '../../../components/shopping-book-cart-item';
import { getBookItemById } from '../../../reducers/selectors';
import {
  addBookToCart,
  removeAllBooksFromCart,
  removeBookFromCart,
} from '../../../actions';

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

// mock selector and dispatch
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn((fn) => fn()),
  useDispatch: jest.fn(() => mockDispatch),
}));
const useSelectorMock = useSelector as jest.MockedFunction<typeof useSelector>;
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>;

// mock selectors
jest.mock('../../../reducers/selectors');
const getBookItemByIdMock = getBookItemById as jest.MockedFunction<typeof getBookItemById>;

// mock actions
jest.mock('../../../actions');
const addBookToCartMock = addBookToCart as jest.MockedFunction<typeof addBookToCart>;
const removeBookFromCartMock = removeBookFromCart as jest.MockedFunction<typeof removeBookFromCart>;
const removeAllBooksFromCartMock = removeAllBooksFromCart as jest.MockedFunction<
  typeof removeAllBooksFromCart>;

describe('Shopping Cart Item Unit tests', () => {
  beforeEach(() => {
    // useSelectorMock.mockImplementation((fn: any) => fn());
    // useDispatchMock.mockImplementation(() => mockDispatch);
    getBookItemByIdMock.mockReset();
    addBookToCartMock.mockReset();
    removeBookFromCartMock.mockReset();
    removeAllBooksFromCartMock.mockReset();
    // useSelectorMock.mockReset();
    // useDispatchMock.mockReset();
    // mockDispatch.mockReset();
  });

  test('Shopping Cart Item Unit add cart test', async () => {
    getBookItemByIdMock.mockReturnValue(() => testBook);
    addBookToCartMock.mockReturnValue({
      type: 'BOOK_ADDED_TO_CART',
      payload: { bookId: testCartItem['1'].id, amount: 1 },
    });
    // useDispatchMock.mockReturnValue(mockDispatch);
    // mockDispatch.mockReturnValue({
    //   type: 'BOOK_ADDED_TO_CART',
    //   payload: { bookId: testCartItem['1'].id, amount: 1 },
    // });
    render(
      <table>
        <tbody>
          <ShoppingBookCartItem item={testCartItem['1']} idx={0} />
        </tbody>
      </table>,
    );
    await act(
      async () => {
        await waitFor(() => screen.getByTestId('item-add-btn-1'));
        await waitFor(() => fireEvent.click(screen.getByTestId('item-add-btn-1')));
      },
    );
    await expect(getBookItemByIdMock).toBeCalledTimes(1);
    await expect(addBookToCartMock).toBeCalledTimes(1);
    await expect(useSelectorMock).toBeCalled();
    await expect(useDispatchMock).toBeCalled();
    await expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'BOOK_ADDED_TO_CART',
      payload: { bookId: testCartItem['1'].id, amount: 1 },
    });
    // expect(mockDispatch.mock.results[0].value).toEqual({
    //   type: 'BOOK_ADDED_TO_CART',
    //   payload: { bookId: testCartItem['1'].id, amount: 1 },
    // });
    // await expect(screen.getByTestId('item-price-1'))
    //   .toHaveTextContent(`$${testBook.price * 2}`);
    // await expect(screen.getByTestId('item-amount-1'))
    //   .toHaveTextContent(`${testCartItem['1'].amount + 1}`);
  });

  test('Shopping Cart Item Unit remove cart test', async () => {
    getBookItemByIdMock.mockReturnValue(() => testBook);
    removeBookFromCartMock.mockReturnValue({
      type: 'BOOK_REMOVED_TO_CART',
      payload: { bookId: testCartItem['1'].id, amount: -1 },
    });
    render(
      <table>
        <tbody>
          <ShoppingBookCartItem item={testCartItem['1']} idx={0} />
        </tbody>
      </table>,
    );
    await act(
      async () => {
        await waitFor(() => screen.getByTestId('item-remove-btn-1'));
        await waitFor(() => fireEvent.click(screen.getByTestId('item-remove-btn-1')));
      },
    );
    await expect(getBookItemByIdMock).toBeCalledTimes(1);
    await expect(removeBookFromCartMock).toBeCalledTimes(1);
    await expect(useSelectorMock).toBeCalled();
    await expect(useDispatchMock).toBeCalled();
    await expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'BOOK_REMOVED_TO_CART',
      payload: { bookId: testCartItem['1'].id, amount: -1 },
    });
  });

  test('Shopping Cart Item Unit remove all cart test', async () => {
    getBookItemByIdMock.mockReturnValue(() => testBook);
    removeAllBooksFromCartMock.mockReturnValue({
      type: 'ALL_BOOKS_REMOVED_TO_CART',
      payload: { bookId: testCartItem['1'].id, amount: 0 },
    });
    render(
      <table>
        <tbody>
          <ShoppingBookCartItem item={testCartItem['1']} idx={0} />
        </tbody>
      </table>,
    );
    await act(
      async () => {
        await waitFor(() => screen.getByTestId('item-all-remove-btn-1'));
        await waitFor(() => fireEvent.click(screen.getByTestId('item-all-remove-btn-1')));
      },
    );
    await expect(getBookItemByIdMock).toBeCalledTimes(1);
    await expect(removeAllBooksFromCartMock).toBeCalledTimes(1);
    await expect(useSelectorMock).toBeCalled();
    await expect(useDispatchMock).toBeCalled();
    await expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ALL_BOOKS_REMOVED_TO_CART',
      payload: { bookId: testCartItem['1'].id, amount: 0 },
    });
  });

  test('Shopping Cart Item Unit undefined book item test', async () => {
    getBookItemByIdMock.mockReturnValue(() => undefined);
    render(
      <table>
        <tbody>
          <ShoppingBookCartItem item={testCartItem['1']} idx={0} />
        </tbody>
      </table>,
    );
    await expect(getBookItemByIdMock).toBeCalledTimes(1);
  });
});
