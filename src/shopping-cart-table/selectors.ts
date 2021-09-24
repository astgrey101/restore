import { createSelector } from 'reselect';
import {
  bookListSelector, getBookItemById, getCartItemById, getCartItemsList,
} from '../reducers/selectors';
import { BookData } from '../services/bookstore-service';

export const getItemSumById = (itemId: number) => createSelector(
  getBookItemById(itemId),
  getCartItemById(itemId),
  (item: BookData | undefined, cartItem: {id: number, amount: number}) => {
    const itemPrice = item?.price ?? 0;
    return itemPrice * cartItem.amount;
  },
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

export const getTotalAmmount = createSelector(
  getCartItemsList,
  (
    cartItems: Array<{id: number, amount: number}>,
  ) => cartItems.reduce((sum: number, item: {id: number, amount: number}) => sum + item.amount, 0),
);
