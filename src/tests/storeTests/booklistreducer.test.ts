import bookList from '../../reducers/book-list';
import RequestStatus from '../../services/requestStatus';

const testBook = {
  id: 1,
  title: 'Consectetur quis in minim dolor cupidatat eu nulla nostrud ex ad minim aute.',
  author: 'Castaneda Dillon',
  price: 293,
  coverImage: 'http://lorempixel.com/300/500/transport/8/',
};

const newTestBook = {
  id: 2,
  title: 'Nulla adipisicing consequat proident do irure irure.',
  author: 'Ginger Carrillo',
  price: 587,
  coverImage: 'http://lorempixel.com/300/500/business/10/',
};

const testBookListState = {
  books: [testBook],
  loading: false,
  error: null,
  status: RequestStatus.FULFILLED,
};

describe('BookList reducer tests', () => {
  test('FETCH_BOOKS_REQUEST_PENDING test', () => {
    const action = ({
      type: 'FETCH_BOOKS_REQUEST_PENDING',
      payload: RequestStatus.PENDING,
    });
    const result = {
      books: [],
      loading: true,
      error: null,
      status: action.payload,
    };
    expect(bookList(undefined, action)).toEqual(result);
  });

  test('FETCH_BOOKS_REQUEST_SUCCESS test', () => {
    const action = ({
      type: 'FETCH_BOOKS_REQUEST_SUCCESS',
      payload: {
        newBooks: [testBook],
        status: RequestStatus.FULFILLED,
      },
    });
    const result = {
      books: action.payload.newBooks,
      loading: false,
      error: null,
      status: action.payload.status,
    };
    expect(bookList(undefined, action)).toEqual(result);
  });

  test('FETCH_BOOKS_REQUEST_ERROR test', () => {
    const action = ({
      type: 'FETCH_BOOKS_REQUEST_ERROR',
      payload: {
        error: Error(),
        status: RequestStatus.ERROR,
      },
    });
    const result = {
      books: [],
      loading: false,
      error: action.payload.error,
      status: action.payload.status,
    };
    expect(bookList(undefined, action)).toEqual(result);
  });

  test('BOOK_ADDED_TO_CATALOG test with state', () => {
    const action = ({
      type: 'BOOK_ADDED_TO_CATALOG',
      payload: {
        newBook: newTestBook,
        status: RequestStatus.FULFILLED,
      },
    });
    const result = {
      books: [testBook, newTestBook],
      loading: false,
      error: null,
      status: action.payload.status,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });

  test('BOOK_ADDED_TO_CATALOG test without state', () => {
    const action = ({
      type: 'BOOK_ADDED_TO_CATALOG',
      payload: {
        newBook: newTestBook,
        status: RequestStatus.FULFILLED,
      },
    });
    const result = {
      books: [newTestBook],
      loading: true,
      error: null,
      status: action.payload.status,
    };
    expect(bookList(undefined, action)).toEqual(result);
  });

  test('BOOK_UPDATED_IN_CATALOG test with state', () => {
    const updateBook = {
      id: testBook.id,
      title: newTestBook.title,
      author: newTestBook.author,
      price: newTestBook.price,
      coverImage: newTestBook.coverImage,
    };
    const action = ({
      type: 'BOOK_UPDATED_IN_CATALOG',
      payload: {
        updatedBook: updateBook,
        status: RequestStatus.FULFILLED,
      },
    });
    const result = {
      books: [updateBook],
      loading: false,
      error: null,
      status: action.payload.status,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });

  test('ADD_BOOKS_REQUEST_ERROR test with state', () => {
    const action = ({
      type: 'ADD_BOOKS_REQUEST_ERROR',
      payload: {
        error: Error(),
        status: RequestStatus.ERROR,
      },
    });
    const result = {
      books: [testBook],
      loading: false,
      error: action.payload.error,
      status: action.payload.status,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });

  test('UPDATE_BOOKS_REQUEST_ERROR test with state', () => {
    const action = ({
      type: 'UPDATE_BOOKS_REQUEST_ERROR',
      payload: {
        error: Error(),
        status: RequestStatus.ERROR,
      },
    });
    const result = {
      books: [testBook],
      loading: false,
      error: action.payload.error,
      status: action.payload.status,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });

  test('ADD_BOOKS_REQUEST_PENDING test', () => {
    const action = ({
      type: 'ADD_BOOKS_REQUEST_PENDING',
      payload: RequestStatus.PENDING,
    });
    const result = {
      books: [testBook],
      loading: false,
      error: null,
      status: action.payload,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });

  test('UPDATE_BOOKS_REQUEST_PENDING test', () => {
    const action = ({
      type: 'UPDATE_BOOKS_REQUEST_PENDING',
      payload: RequestStatus.PENDING,
    });
    const result = {
      books: [testBook],
      loading: false,
      error: null,
      status: action.payload,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });

  test('Unexpected action type test', () => {
    const action = ({
      type: 'UNEXPECTED_ACTION_TYPE',
    });
    const result = {
      books: [testBook],
      loading: false,
      error: null,
      status: RequestStatus.FULFILLED,
    };
    expect(bookList(testBookListState, action)).toEqual(result);
  });
});
