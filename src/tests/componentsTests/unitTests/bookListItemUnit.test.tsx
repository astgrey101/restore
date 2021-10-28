import React from 'react';
import { useDispatch } from 'react-redux';
import {
  act, fireEvent,
  render, screen, waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import BookListItem from '../../../components/book-list-item/book-list-item';
import { addBookToCart } from '../../../actions';

// mock dispatch
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
}));
const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>;

// mock actions
jest.mock('../../../actions');
const addBookToCartMock = addBookToCart as jest.MockedFunction<typeof addBookToCart>;

const switchDisplayEditFormMock = jest.fn();

const testBook = {
  id: 1,
  title: 'Consectetur quis in minim dolor cupidatat eu nulla nostrud ex ad minim aute.',
  author: 'Castaneda Dillon',
  price: 293,
  coverImage: 'http://lorempixel.com/300/500/transport/8/',
};

describe('Book List Item Unit tests', () => {
  beforeEach(() => {
    addBookToCartMock.mockReset();
  });
  test('Book List Item add to cart test', async () => {
    addBookToCartMock.mockReturnValue({
      type: 'BOOK_ADDED_TO_CART',
      payload: { bookId: testBook.id, amount: 1 },
    });
    render(
      <BookListItem
        book={testBook}
        style={undefined}
        switchDisplayEditForm={switchDisplayEditFormMock}
      />,
    );
    await act(
      async () => {
        await waitFor(() => screen.getByTestId('add-to-cart-btn-1'));
        await waitFor(() => fireEvent.click(screen.getByTestId('add-to-cart-btn-1')));
      },
    );
    await expect(useDispatchMock).toBeCalled();
    await expect(mockDispatch).toBeCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'BOOK_ADDED_TO_CART',
      payload: { bookId: testBook.id, amount: 1 },
    });
  });

  test('Book List Item display edit form test', async () => {
    render(
      <BookListItem
        book={testBook}
        style={undefined}
        switchDisplayEditForm={switchDisplayEditFormMock}
      />,
    );
    await act(
      async () => {
        await waitFor(() => screen.getByTestId('edit-book-btn-1'));
        await waitFor(() => fireEvent.click(screen.getByTestId('edit-book-btn-1')));
      },
    );
    await expect(switchDisplayEditFormMock).toBeCalled(); // check that this element in data set
  });
});
