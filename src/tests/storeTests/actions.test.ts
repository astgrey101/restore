import {
  addBook,
  addBookError,
  addBookPending, addBookToCart,
  fetchBooks,
  fetchBooksError,
  fetchBooksPending, removeAllBooksFromCart, removeBookFromCart, updateBook, updateBookError,
  updateBookPending,
} from '../../actions';
import RequestStatus from '../../services/requestStatus';

describe('Fetch books actions tests', () => {
  test('Fetch books pending action test', () => {
    const result = {
      type: 'FETCH_BOOKS_REQUEST_PENDING',
      payload: RequestStatus.PENDING,
    };
    expect(fetchBooksPending()).toEqual(result);
  });

  test('Fetch books error action test', () => {
    const result = {
      type: 'FETCH_BOOKS_REQUEST_ERROR',
      payload: {
        error: Error(),
        status: RequestStatus.ERROR,
      },
    };
    expect(fetchBooksError(Error(), RequestStatus.ERROR)).toEqual(result);
  });

  test('Fetch books success action test', () => {
    const result = {
      type: 'FETCH_BOOKS_REQUEST_SUCCESS',
      payload: {
        newBooks: [],
        status: RequestStatus.FULFILLED,
      },
    };
    expect(fetchBooks([], RequestStatus.FULFILLED)).toEqual(result);
  });
});

describe('Add book actions tests', () => {
  test('Add book pending action test', () => {
    const result = {
      type: 'ADD_BOOKS_REQUEST_PENDING',
      payload: RequestStatus.PENDING,
    };
    expect(addBookPending()).toEqual(result);
  });

  test('Add book error action test', () => {
    const result = {
      type: 'ADD_BOOKS_REQUEST_ERROR',
      payload: {
        error: Error(),
        status: RequestStatus.ERROR,
      },
    };
    expect(addBookError(Error(), RequestStatus.ERROR)).toEqual(result);
  });

  test('Add book success action test', () => {
    const addedBook = {
      id: 1,
      title: '',
      author: '',
      price: 1,
      coverImage: '',
    };
    const result = {
      type: 'BOOK_ADDED_TO_CATALOG',
      payload: {
        newBook: addedBook,
        status: RequestStatus.FULFILLED,
      },
    };
    expect(addBook(addedBook, RequestStatus.FULFILLED)).toEqual(result);
  });
});

describe('Update book action tests', () => {
  test('Update book pending action test', () => {
    const result = {
      type: 'UPDATE_BOOKS_REQUEST_PENDING',
      payload: RequestStatus.PENDING,
    };
    expect(updateBookPending()).toEqual(result);
  });

  test('Update book error action test', () => {
    const result = {
      type: 'UPDATE_BOOKS_REQUEST_ERROR',
      payload: {
        error: Error(),
        status: RequestStatus.ERROR,
      },
    };
    expect(updateBookError(Error(), RequestStatus.ERROR)).toEqual(result);
  });

  test('Update book success action test', () => {
    const changedBook = {
      id: 1,
      title: '',
      author: '',
      price: 1,
      coverImage: '',
    };
    const result = {
      type: 'BOOK_UPDATED_IN_CATALOG',
      payload: {
        updatedBook: changedBook,
        status: RequestStatus.FULFILLED,
      },
    };
    expect(updateBook(changedBook, RequestStatus.FULFILLED)).toEqual(result);
  });
});

describe('Shopping card action tests', () => {
  test('Add book to shopping card action test without amount', () => {
    const testBookId = 1;
    const result = {
      type: 'BOOK_ADDED_TO_CART',
      payload: {
        bookId: testBookId,
        amount: 1,
      },
    };
    expect(addBookToCart(testBookId)).toEqual(result);
  });

  test('Add book to shopping card action test with amount', () => {
    const testBookId = 1;
    const testBookAmount = 10;
    const result = {
      type: 'BOOK_ADDED_TO_CART',
      payload: {
        bookId: testBookId,
        amount: testBookAmount,
      },
    };
    expect(addBookToCart(testBookId, testBookAmount)).toEqual(result);
  });

  test('Remove book to shopping card action test without amount', () => {
    const testBookId = 1;
    const result = {
      type: 'BOOK_REMOVED_TO_CART',
      payload: {
        bookId: testBookId,
        amount: -1,
      },
    };
    expect(removeBookFromCart(testBookId)).toEqual(result);
  });

  test('Remove book to shopping card action test with amount', () => {
    const testBookId = 1;
    const testBookAmount = 10;
    const result = {
      type: 'BOOK_REMOVED_TO_CART',
      payload: {
        bookId: testBookId,
        amount: testBookAmount,
      },
    };
    expect(removeBookFromCart(testBookId, testBookAmount)).toEqual(result);
  });

  test('Remove All book to shopping card action test without amount', () => {
    const testBookId = 1;
    const result = {
      type: 'ALL_BOOKS_REMOVED_TO_CART',
      payload: {
        bookId: testBookId,
        amount: 0,
      },
    };
    expect(removeAllBooksFromCart(testBookId)).toEqual(result);
  });

  test('Remove All book to shopping card action test with amount', () => {
    const testBookId = 1;
    const testBookAmount = 10;
    const result = {
      type: 'ALL_BOOKS_REMOVED_TO_CART',
      payload: {
        bookId: testBookId,
        amount: testBookAmount,
      },
    };
    expect(removeAllBooksFromCart(testBookId, testBookAmount)).toEqual(result);
  });
});
