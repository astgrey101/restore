import rootReducer from '../../reducers';
import RequestStatus from '../../services/requestStatus';

describe('Root reducer tests', () => {
  const testState = {
    bookList: {
      books: [],
      loading: true,
      error: null,
      status: RequestStatus.PENDING,
    },
    shoppingCart: {
      cartItems: {
        1: {
          id: 1,
          amount: 5,
        },
      },
    },
  };
  test('Root reducer test for bookList', () => {
    expect(
      rootReducer(
        testState,
        {
          type: 'UPDATE_BOOKS_REQUEST_PENDING',
          payload: RequestStatus.PENDING,
        },
      ).bookList,
    ).toEqual(testState.bookList);
  });

  test('Root reducer test for shoppingCart', () => {
    expect(
      rootReducer(
        testState,
        {
          type: 'BOOK_ADDED_TO_CART',
          payload: {
            bookId: 1,
            amount: 2,
          },
        },
      ).shoppingCart.cartItems[1].amount,
    ).toEqual(7);
  });
});
