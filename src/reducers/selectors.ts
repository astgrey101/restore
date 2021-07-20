import { createSelector } from "reselect"
import { RootState } from "."
import { BookData } from "../services/bookstore-service"

export const bookListSelector = (state: RootState) => state.bookList.books

export const getCartItemsList = (state: RootState) => Object.values(state.shoppingCart.cartItems)

export const getBookItemById = (itemId: number) => createSelector(
  bookListSelector,
  books => books.find((book: BookData) => book.id===itemId)
)

export const getCartItemById = (itemId: number) => (state: RootState) => state.shoppingCart.cartItems[itemId]