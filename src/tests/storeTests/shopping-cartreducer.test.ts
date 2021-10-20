import shoppingCart, { ShoppingCartType } from '../../reducers/shopping-cart';

let testState: ShoppingCartType;

describe('Shopping-Cart reducer tests', () => {
  beforeEach(() => {
    const testCartItem = {
      1: {
        id: 1,
        amount: 5,
      },
    };

    testState = {
      cartItems: testCartItem,
    };
  });

  test('BOOK_ADDED_TO_CART test with state for new item', () => {
    const action = ({
      type: 'BOOK_ADDED_TO_CART',
      payload: {
        bookId: 2,
        amount: 2,
      },
    });
    const result = {
      cartItems: {
        1: {
          id: 1,
          amount: 5,
        },
        2: {
          id: 2,
          amount: 2,
        },
      },
    };
    expect(shoppingCart(testState, action)).toEqual(result);
  });

  test('BOOK_ADDED_TO_CART test without state for new item', () => {
    const action = ({
      type: 'BOOK_ADDED_TO_CART',
      payload: {
        bookId: 2,
        amount: 2,
      },
    });
    const result = {
      cartItems: {
        2: {
          id: 2,
          amount: 2,
        },
      },
    };
    expect(shoppingCart(undefined, action)).toEqual(result);
  });

  test('BOOK_ADDED_TO_CART test with state increase amount', () => {
    const action = ({
      type: 'BOOK_ADDED_TO_CART',
      payload: {
        bookId: 1,
        amount: 2,
      },
    });
    const result = {
      cartItems: {
        1: {
          id: 1,
          amount: 7,
        },
      },
    };
    expect(shoppingCart(testState, action)).toEqual(result);
  });

  test('BOOK_REMOVED_TO_CART test with state decrease amount', () => {
    const action = ({
      type: 'BOOK_REMOVED_TO_CART',
      payload: {
        bookId: 1,
        amount: -1,
      },
    });
    const result = {
      cartItems: {
        1: {
          id: 1,
          amount: 4,
        },
      },
    };
    expect(shoppingCart(testState, action)).toEqual(result);
  });

  test('BOOK_REMOVED_TO_CART test without state decrease amount', () => {
    const action = ({
      type: 'BOOK_REMOVED_TO_CART',
      payload: {
        bookId: 1,
        amount: -1,
      },
    });
    const result = {
      cartItems: {
        1: {
          id: 1,
          amount: -1,
        },
      },
    };
    expect(shoppingCart(undefined, action)).toEqual(result);
  });

  test('BOOK_REMOVED_TO_CART test with state decrease 1 amount', () => {
    const localTestState = {
      cartItems: {
        1: {
          id: 1,
          amount: 1,
        },
      },
    };
    const action = ({
      type: 'BOOK_REMOVED_TO_CART',
      payload: {
        bookId: 1,
        amount: -1,
      },
    });
    const result = {
      cartItems: {},
    };
    expect(shoppingCart(localTestState, action)).toEqual(result);
  });

  test('BOOK_REMOVED_TO_CART test without state decrease 1 amount', () => {
    const action = ({
      type: 'BOOK_REMOVED_TO_CART',
      payload: {
        bookId: 1,
        amount: -1,
      },
    });
    const result = {
      cartItems: {
        1: {
          id: 1,
          amount: -1,
        },
      },
    };
    expect(shoppingCart(undefined, action)).toEqual(result);
  });

  test('ALL_BOOKS_REMOVED_TO_CART test with state', () => {
    const action = ({
      type: 'ALL_BOOKS_REMOVED_TO_CART',
      payload: {
        bookId: 1,
        amount: 0,
      },
    });
    const result = {
      cartItems: {},
    };
    expect(shoppingCart(testState, action)).toEqual(result);
  });

  test('ALL_BOOKS_REMOVED_TO_CART test without state', () => {
    const action = ({
      type: 'ALL_BOOKS_REMOVED_TO_CART',
      payload: {
        bookId: 1,
        amount: 0,
      },
    });
    const result = {
      cartItems: {},
    };
    expect(shoppingCart(undefined, action)).toEqual(result);
  });

  test('Unexpected action type', () => {
    const action = ({
      type: 'UNEXPECTED_ACTION_TYPE',
      payload: {
        bookId: 1,
        amount: 0,
      },
    });
    const result = {
      cartItems: {
        1: {
          id: 1,
          amount: 5,
        },
      },
    };
    expect(shoppingCart(testState, action)).toEqual(result);
  });
});
