import { AnyAction } from 'redux';
import { BookData } from '../services/bookstore-service';
import RequestStatus from '../services/requestStatus';

const initialState = {
  books: [],
  loading: true,
  error: null,
  status: RequestStatus.PENDING,
};

interface BookListType {
    books: Array<BookData>,
    loading: boolean,
    error: Error | null,
    status: RequestStatus
}

const bookList = (state: BookListType = initialState, action: AnyAction): BookListType => {
  switch (action.type) {
    case 'FETCH_BOOKS_REQUEST_PENDING':
      return {
        books: [],
        loading: true,
        error: null,
        status: action.payload,
      };

    case 'FETCH_BOOKS_REQUEST_SUCCESS':
      return {
        books: action.payload.newBooks,
        loading: false,
        error: null,
        status: action.payload.status,
      };

    case 'FETCH_BOOKS_REQUEST_ERROR':
      return {
        books: [],
        loading: false,
        error: action.payload.error,
        status: action.payload.status,
      };

    case 'BOOK_ADDED_TO_CATALOG': {
      return {
        ...state,
        books: state.books.concat(action.payload.newBook),
        status: action.payload.status,
      };
    }

    case 'BOOK_UPDATED_IN_CATALOG': {
      return {
        ...state,
        books: state.books.slice(0, action.payload.updatedBook.id - 1)
          .concat(action.payload.updatedBook)
          .concat(state.books.slice(action.payload.updatedBook.id, state.books.length)),
        status: action.payload.status,
      };
    }

    case 'ADD_BOOKS_REQUEST_ERROR':
    case 'UPDATE_BOOKS_REQUEST_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        status: action.payload.status,
      };

    case 'ADD_BOOKS_REQUEST_PENDING':
    case 'UPDATE_BOOKS_REQUEST_PENDING':
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default bookList;
