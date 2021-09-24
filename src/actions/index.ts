import BookstoreService, { AddBookData, BookData } from '../services/bookstore-service';

export interface BookPayloadType {
    type: string,
    payload?: {
        bookId: number,
        amount: number
    }

}

export interface BookListPayloadType {
    type: string,
    payload?: Array<BookData>

}

export enum RequestStatus {
    PENDING = 'Pending',
    FULFILLED = 'Fulfilled',
    ERROR = 'Error'
}

// fetch books catalog actions

export const fetchBooks = (newBooks: Array<BookData>, status: RequestStatus) => ({
  type: 'FETCH_BOOKS_REQUEST_SUCCESS',
  payload: { newBooks, status },
});

export const fetchBooksPending = () => ({
  type: 'FETCH_BOOKS_REQUEST_PENDING',
  payload: RequestStatus.PENDING,
});

export const fetchBooksError = (error: any, status: RequestStatus) => ({
  type: 'FETCH_BOOKS_REQUEST_ERROR',
  payload: { error, status },
});

export const fetchBooksAsync = (service: BookstoreService) => (dispatch: any) => {
  dispatch(fetchBooksPending());
  return service.getBooks()
    .then((data: any) => dispatch(fetchBooks(data, RequestStatus.FULFILLED)))
    .catch((err: any) => dispatch(fetchBooksError(err, RequestStatus.ERROR)));
};

// add book to catalog actions

export const addBook = (newBook: BookData, status: RequestStatus) => ({
  type: 'BOOK_ADDED_TO_CATALOG',
  payload: { newBook, status },
});

export const addBookPending = () => ({
  type: 'ADD_BOOKS_REQUEST_PENDING',
  payload: RequestStatus.PENDING,
});

export const addBookError = (error: any, status: RequestStatus) => ({
  type: 'ADD_BOOKS_REQUEST_ERROR',
  payload: { error, status },
});

export const addBookToCatalogAsync = (
  service: BookstoreService,
  addedBook: AddBookData,
) => (dispatch: any) => {
  dispatch(addBookPending());
  return service.addBook(addedBook)
    .then(() => {
      service.getBookWithParams(addedBook.title, addedBook.author)
        .then((data: any) => dispatch(addBook(data, RequestStatus.FULFILLED)));
    })
    .catch((err: any) => dispatch(addBookError(err, RequestStatus.ERROR)));
};

// update book in catalog actions

export const updateBook = (updatedBook: BookData, status: RequestStatus) => ({
  type: 'BOOK_UPDATED_IN_CATALOG',
  payload: { updatedBook, status },
});

export const updateBookPending = () => ({
  type: 'UPDATE_BOOKS_REQUEST_PENDING',
  payload: RequestStatus.PENDING,
});

export const updateBookError = (error: any, status: RequestStatus) => ({
  type: 'UPDATE_BOOKS_REQUEST_ERROR',
  payload: { error, status },
});

export const updateBookInCatalogAsync = (
  service: BookstoreService,
  updatedBook: BookData,
) => (dispatch: any) => {
  dispatch(updateBookPending());
  return service.updateBook(updatedBook)
    .then(() => {
      service.getBookById(updatedBook.id)
        .then((data: any) => dispatch(updateBook(data, RequestStatus.FULFILLED)));
    })
    .catch((err: any) => dispatch(updateBookError(err, RequestStatus.ERROR)));
};

// add book to card actions

export const addBookToCart = (bookId: number, amount: number = 1) => ({
  type: 'BOOK_ADDED_TO_CART',
  payload: { bookId, amount },
});

export const removeBookFromCart = (bookId: number, amount: number = -1) => ({
  type: 'BOOK_REMOVED_TO_CART',
  payload: { bookId, amount },
});

export const removeAllBooksFromCart = (bookId: number, amount: number = 0) => ({
  type: 'ALL_BOOKS_REMOVED_TO_CART',
  payload: { bookId, amount },
});
