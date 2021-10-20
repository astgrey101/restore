import {
  bookListSelector,
  getBookItemById,
  getCartItemsList, getTotalAmount, getTotalSum,
} from '../../reducers/selectors';
import RequestStatus from '../../services/requestStatus';

describe('Test Selectors', () => {
  const testBook = {
    id: 1,
    title: 'Consectetur quis in minim dolor cupidatat eu nulla nostrud ex ad minim aute.',
    author: 'Castaneda Dillon',
    price: 293,
    coverImage: 'http://lorempixel.com/300/500/transport/8/',
  };

  const testCartItem = {
    id: {
      id: 1,
      amount: 1,
    },
  };

  const testState = {
    bookList: {
      books: [testBook],
      loading: false,
      error: null,
      status: RequestStatus.FULFILLED,
    },
    shoppingCart: {
      cartItems: testCartItem,
    },
  };

  test('Test bookListSelector', () => {
    expect(bookListSelector(testState)).toEqual([testBook]);
  });

  test('Test getCartItemsList', () => {
    expect(getCartItemsList(testState)).toEqual([testCartItem.id]);
  });

  test('Test getBookItemById', () => {
    expect(getBookItemById(testState)(1)).toEqual(testBook);
  });

  test('Test getTotalSum', () => {
    expect(getTotalSum(testState)).toEqual(293);
  });

  test('Test getTotalAmount', () => {
    expect(getTotalAmount(testState)).toEqual(1);
  });
});
