import BookstoreService, { AddBookData, BookData } from '../services/bookstore-service';
import { AppDispatch } from '../store';
import RequestStatus from '../services/requestStatus';

export interface BookListPayloadType {
    type: string,
    payload?: Array<BookData>

}

interface ActionPendingType {
    payload: RequestStatus,
    type: string
}

interface ActionErrorType {
    payload: {
        error: Error,
        status: RequestStatus
    },
    type: string
}

interface ActionCartType {
    payload: {
        amount: number,
        bookId: number
    },
    type: string
}

interface ActionFetchBooksType {
    payload: {
        newBooks: Array<BookData>,
        status: RequestStatus
    },
    type: string
}

interface ActionAddBookType {
    payload: {
            newBook: BookData,
            status: RequestStatus
        },
    type: string
}

// fetch books catalog actions

export const fetchBooks = (
  newBooks: Array<BookData>, status: RequestStatus,
): ActionFetchBooksType => ({
  type: 'FETCH_BOOKS_REQUEST_SUCCESS',
  payload: { newBooks, status },
});

export const fetchBooksPending = (): ActionPendingType => ({
  type: 'FETCH_BOOKS_REQUEST_PENDING',
  payload: RequestStatus.PENDING,
});

export const fetchBooksError = (
  error: Error, status: RequestStatus,
): ActionErrorType => ({
  type: 'FETCH_BOOKS_REQUEST_ERROR',
  payload: { error, status },
});

export const fetchBooksAsync = (
  service: BookstoreService,
) => (dispatch: AppDispatch): Promise<ActionErrorType | ActionFetchBooksType> => {
  dispatch(fetchBooksPending());
  return service.getBooks()
    .then((data: Array<BookData>) => dispatch(fetchBooks(data, RequestStatus.FULFILLED)))
    .catch((err: Error) => dispatch(fetchBooksError(err, RequestStatus.ERROR)));
};

// add book to catalog actions

export const addBook = (
  newBook: BookData, status: RequestStatus,
): ActionAddBookType => ({
  type: 'BOOK_ADDED_TO_CATALOG',
  payload: { newBook, status },
});

export const addBookPending = (): ActionPendingType => ({
  type: 'ADD_BOOKS_REQUEST_PENDING',
  payload: RequestStatus.PENDING,
});

export const addBookError = (
  error: Error, status: RequestStatus,
): ActionErrorType => ({
  type: 'ADD_BOOKS_REQUEST_ERROR',
  payload: { error, status },
});

export const addBookToCatalogAsync = (
  service: BookstoreService,
  addedBook: AddBookData,
) => (dispatch: AppDispatch): Promise<void | ActionErrorType> => {
  dispatch(addBookPending());
  return service.addBook(addedBook)
    .then(() => {
      service.getBookWithParams(addedBook.title, addedBook.author)
        .then((data: BookData) => dispatch(addBook(data, RequestStatus.FULFILLED)));
    })
    .catch((err: Error) => dispatch(addBookError(err, RequestStatus.ERROR)));
};

// update book in catalog actions

export const updateBook = (
  updatedBook: BookData, status: RequestStatus,
): {payload: {updatedBook: BookData, status: RequestStatus}, type: string} => ({
  type: 'BOOK_UPDATED_IN_CATALOG',
  payload: { updatedBook, status },
});

export const updateBookPending = (): ActionPendingType => ({
  type: 'UPDATE_BOOKS_REQUEST_PENDING',
  payload: RequestStatus.PENDING,
});

export const updateBookError = (
  error: Error, status: RequestStatus,
): ActionErrorType => ({
  type: 'UPDATE_BOOKS_REQUEST_ERROR',
  payload: { error, status },
});

export const updateBookInCatalogAsync = (
  service: BookstoreService,
  updatedBook: BookData,
) => (dispatch: AppDispatch): Promise<void | ActionErrorType> => {
  dispatch(updateBookPending());
  return service.updateBook(updatedBook)
    .then(() => {
      service.getBookById(updatedBook.id)
        .then((data: BookData) => dispatch(updateBook(data, RequestStatus.FULFILLED)));
    })
    .catch((err: Error) => dispatch(updateBookError(err, RequestStatus.ERROR)));
};

// add book to card actions

export const addBookToCart = (
  bookId: number, amount = 1,
): ActionCartType => ({
  type: 'BOOK_ADDED_TO_CART',
  payload: { bookId, amount },
});

export const removeBookFromCart = (
  bookId: number, amount = -1,
): ActionCartType => ({
  type: 'BOOK_REMOVED_TO_CART',
  payload: { bookId, amount },
});

export const removeAllBooksFromCart = (
  bookId: number, amount = 0,
): ActionCartType => ({
  type: 'ALL_BOOKS_REMOVED_TO_CART',
  payload: { bookId, amount },
});
