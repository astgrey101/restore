import { createSelector } from 'reselect';
import { RootState } from '.';
import { BookData } from '../services/bookstore-service';

export const bookListSelector = (state: RootState): Array<BookData> => state.bookList.books;

export const getCartItemsList = (
  state: RootState,
): {id: number, amount: number}[] => Object.values(state.shoppingCart.cartItems);

// export const getBookItemById = (itemId: number) => createSelector(
//   bookListSelector,
//   (books:BookData[]) => books.find((book: BookData) => book.id === itemId),
// );

export const getBookItemById = createSelector(
  bookListSelector,
  (books: Array<BookData>) => (
    itemId: number,
  ) => books.find((book: BookData) => book.id === itemId),
);

export const getCartItemById = (
  itemId: number,
) => (state: RootState): {id: number, amount: number} => state.shoppingCart.cartItems[itemId];
