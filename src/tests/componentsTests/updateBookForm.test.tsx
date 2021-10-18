import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import {
  render, waitFor, screen, fireEvent, act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import thunk from 'redux-thunk';
import { rest } from 'msw';
import UpdateBookForm from '../../components/update-book-form';
import RequestStatus from '../../services/requestStatus';

const testBook = {
  id: 1,
  title: 'Consectetur quis in minim dolor cupidatat eu nulla nostrud ex ad minim aute.',
  author: 'Castaneda Dillon',
  price: 293,
  coverImage: 'http://lorempixel.com/300/500/transport/8/',
};

const testCartItem = {
  1: {
    id: 1,
    amount: 1,
  },
};

const server = setupServer(
  rest.post('http://localhost:8000/books',
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json({}),
    )),
  rest.get(`http://localhost:8000/books/${testBook.id}`,
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json({}),
    )),
  rest.options(`http://localhost:8000/books/${testBook.id}`,
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json({}),
    )),
  rest.put(`http://localhost:8000/books/${testBook.id}`,
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json({}),
    )),
);

const mockStore = configureMockStore([thunk]);
let myStore: MockStoreEnhanced<unknown>;
const fn = jest.fn();

afterEach(() => server.resetHandlers());
beforeAll(() => server.listen());
afterAll(() => server.close());
beforeEach(() => {
  myStore = mockStore({
    bookList: {
      books: [testBook],
      loading: false,
      error: null,
      status: RequestStatus.FULFILLED,
    },
    shoppingCart: {
      cartItems: testCartItem,
    },
  });
});

describe('Update book form component tests', () => {
  test('Update book form display test', async () => {
    render(
      <Provider store={myStore}>
        <UpdateBookForm bookId={testBook.id} switchDisplayEditForm={() => fn} />
      </Provider>,
    );
    await expect(screen.getByTestId('edit-book-input-title')).toHaveValue(testBook.title);
    await expect(screen.getByTestId('edit-book-input-author')).toHaveValue(testBook.author);
    await expect(screen.getByTestId('edit-book-input-price')).toHaveValue(testBook.price);
    await expect(screen.getByTestId('save-edit-book-btn')).toBeDefined();
    await expect(screen.getByTestId('cancel-edit-book-btn')).toBeDefined();
  });

  test('Update book form validation test', async () => {
    render(
      <Provider store={myStore}>
        <UpdateBookForm bookId={testBook.id} switchDisplayEditForm={() => fn} />
      </Provider>,
    );
    const inputTitleField = screen.getByTestId('edit-book-input-title');
    const inputAuthorField = screen.getByTestId('edit-book-input-author');
    const inputPriceField = screen.getByTestId('edit-book-input-price');
    await act(
      async () => {
        await waitFor(() => userEvent.clear(inputTitleField));
        await waitFor(() => userEvent.clear(inputAuthorField));
        await waitFor(() => userEvent.clear(inputPriceField));
        await waitFor(() => fireEvent.click(screen.getByTestId('save-edit-book-btn')));
      },
    );

    await act(
      async () => {
        await waitFor(() => expect(screen.queryByText('Book Title should be filled in')).toBeDefined());
        await waitFor(() => expect(screen.queryByText('Book Author should be filled in')).toBeDefined());
        await waitFor(() => expect(screen.queryByText('Book Price should be filled in')).toBeDefined());
      },
    );
  });

  test('Update book form validation with negative price test', async () => {
    render(
      <Provider store={myStore}>
        <UpdateBookForm bookId={testBook.id} switchDisplayEditForm={() => fn} />
      </Provider>,
    );
    const inputPriceField = screen.getByTestId('edit-book-input-price');
    await act(
      async () => {
        await waitFor(() => fireEvent.change(inputPriceField, { target: { value: -100 } }));
        await waitFor(() => fireEvent.click(screen.getByTestId('save-edit-book-btn')));
      },
    );

    await act(
      async () => {
        await waitFor(() => expect(screen.queryByText('Book Price should be positive number')).toBeDefined());
      },
    );
  });

  test('Update book test', async () => {
    render(
      <Provider store={myStore}>
        <UpdateBookForm bookId={testBook.id} switchDisplayEditForm={() => fn} />
      </Provider>,
    );
    const inputTitleField = screen.getByTestId('edit-book-input-title');
    const inputAuthorField = screen.getByTestId('edit-book-input-author');
    const inputPriceField = screen.getByTestId('edit-book-input-price');
    const uploader = screen.getByTestId('update-book-input-image');
    const file = new File([''], 'chucknorris.png', { type: 'image/png' });
    await act(
      async () => {
        await waitFor(() => fireEvent.change(uploader, { target: { files: [file] } }));
      },
    );
    const image = screen.getByTestId('update-book-image') as HTMLImageElement;
    image.src = 'http://lorempixel.com/300/500/technics/5/';
    await waitFor(() => expect(screen.getByTestId('update-book-image'))
      .toHaveAttribute('src', 'http://lorempixel.com/300/500/technics/5/'));
    await act(
      async () => {
        await waitFor(() => fireEvent.change(inputTitleField, { target: { value: 'Test est esse labore aute consequat.' } }));
        await waitFor(() => fireEvent.change(inputAuthorField, { target: { value: 'Test Johnston' } }));
        await waitFor(() => fireEvent.change(inputPriceField, { target: { value: 100 } }));
        await waitFor(() => fireEvent.click(screen.getByTestId('save-edit-book-btn')));
      },
    );

    await waitFor(() => expect(screen.getByText('Book successfully updated')).toBeDefined());
    await act(
      async () => {
        // wait until form become empty
        jest.setTimeout(4000);
        await waitFor(() => expect(screen.queryByText('Book successfully updated')).toBeDefined());
        await waitFor(() => expect(inputTitleField).toHaveValue('Test est esse labore aute consequat.'));
        await waitFor(() => expect(inputAuthorField).toHaveValue('Test Johnston'));
        await waitFor(() => expect(inputPriceField).toHaveValue(100));
      },
    );
  });

  test('Update book without change image test', async () => {
    render(
      <Provider store={myStore}>
        <UpdateBookForm bookId={testBook.id} switchDisplayEditForm={() => fn} />
      </Provider>,
    );
    const inputTitleField = screen.getByTestId('edit-book-input-title');
    const inputAuthorField = screen.getByTestId('edit-book-input-author');
    const inputPriceField = screen.getByTestId('edit-book-input-price');
    await act(
      async () => {
        await waitFor(() => fireEvent.change(inputTitleField, { target: { value: 'Tests est esse labore aute consequat.' } }));
        await waitFor(() => fireEvent.change(inputAuthorField, { target: { value: 'Tests Johnston' } }));
        await waitFor(() => fireEvent.change(inputPriceField, { target: { value: 1000 } }));
        await waitFor(() => fireEvent.click(screen.getByTestId('save-edit-book-btn')));
      },
    );

    await waitFor(() => expect(screen.getByText('Book successfully updated')).toBeDefined());
    jest.useFakeTimers();
    await act(
      async () => {
        // timeout not set. need to fix
        jest.setTimeout(4000);
        await waitFor(() => expect(screen.queryByText('Book successfully updated')).toBeDefined());
        await waitFor(() => expect(inputTitleField).toHaveValue('Tests est esse labore aute consequat.'));
        await waitFor(() => expect(inputAuthorField).toHaveValue('Tests Johnston'));
        await waitFor(() => expect(inputPriceField).toHaveValue(1000));
      },
    );
    jest.runAllTimers();
  });
});
