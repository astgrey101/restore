import { createSelector } from 'reselect';
import { RootState } from '.';
import { BookData } from '../services/bookstore-service';

export const bookListSelector = (state: RootState): Array<BookData> => state.bookList.books;

export const getCartItemsList = (
  state: RootState,
): {id: number, amount: number}[] => Object.values(state.shoppingCart.cartItems);

export const getBookItemById = createSelector(
  bookListSelector,
  (books: Array<BookData>) => (
    itemId: number,
  ) => books.find((book: BookData) => book.id === itemId),
);

export const getTotalSum = createSelector(
  getCartItemsList,
  bookListSelector,
  (
    cartItems: Array<{id: number, amount: number}>, books: Array<BookData>,
  ) => cartItems.reduce((sum: number, item: {id: number, amount: number}) => {
    const book = books.find((bookItem: BookData) => bookItem.id === item.id);
    const bookPrice = book?.price ?? 0;
    return sum + item.amount * bookPrice;
  }, 0),
);

export const getTotalAmount = createSelector(
  getCartItemsList,
  (
    cartItems: Array<{id: number, amount: number}>,
  ) => cartItems.reduce((sum: number, item: {id: number, amount: number}) => sum + item.amount, 0),
);
