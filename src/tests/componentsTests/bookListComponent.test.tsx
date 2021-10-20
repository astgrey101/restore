import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { setupServer } from 'msw/node';
import BookListContainer from '../../components/book-list';
import { store } from '../../store';

const server = setupServer(
  rest.get('http://localhost:8000/books',
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json(
        [
          {
            title: 'Reprehenderit est esse labore aute consequat.',
            author: 'Alyce Johnston',
            price: 94800,
            coverImage: 'http://lorempixel.com/300/500/technics/5/',
            id: 1,
          },
          {
            title: 'In est exercitation minim fugiat dolor minim sunt tempor.',
            author: 'Theresa Farley',
            price: 244,
            coverImage: 'http://lorempixel.com/300/500/transport/4/',
            id: 2,
          },
        ],
      ),
    )),
);

afterEach(() => server.resetHandlers());

const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight') as PropertyDescriptor;
const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth') as PropertyDescriptor;

beforeAll(() => {
  server.listen();
  // added for mock AutoSizer
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 50 });
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 50 });
});

afterAll(() => {
  // added for mock AutoSizer
  Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight);
  Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth);
  server.close();
});

describe('Book List component tests', () => {
  test('Test Book List display', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('book-1'));
    await waitFor(() => screen.getByTestId('book-2'));

    expect(screen.getByTestId('book-1')).toHaveTextContent('Alyce Johnston');
    expect(screen.getByTestId('book-2')).toHaveTextContent('Theresa Farley');
  });

  // test('Test Spinner display', async () => {
  //   render(
  //     <Provider store={store}>
  //       <BookListContainer />
  //     </Provider>,
  //   );
  //   await waitFor(() => screen.getByTestId('spinner'));
  //
  //   expect(screen.getByTestId('spinner')).toHaveTextContent('loading...');
  // });

  test('Test Error display', async () => {
    server.use(
      rest.get('http://localhost:8000/books',
        (
          req,
          res,
          ctx,
        ) => res(ctx.status(404))),
    );
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('error'));

    expect(screen.getByTestId('error')).toHaveTextContent('Error!');
  });

  test('Test Add Book Form display', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('add-book-btn'));
    fireEvent.click(screen.getByTestId('add-book-btn'));

    expect(screen.getByTestId('add-book-input-title')).toBeDefined();
    expect(screen.getByTestId('add-book-input-author')).toBeDefined();
    expect(screen.getByTestId('add-book-input-price')).toBeDefined();
  });

  test('Test Add Book Form hide', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('add-book-btn'));
    fireEvent.click(screen.getByTestId('add-book-btn'));
    expect(screen.getByTestId('add-book-input-title')).toBeDefined();

    fireEvent.click(screen.getByTestId('add-book-btn'));
    const bookTitleLabel = screen.queryByText('Book Title');
    expect(bookTitleLabel).not.toBeInTheDocument();
  });

  test('Test Edit Book Form display', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('edit-book-btn-1'));
    fireEvent.click(screen.getByTestId('edit-book-btn-1'));

    expect(screen.getByTestId('edit-book-input-title')).toBeDefined();
    expect(screen.getByTestId('edit-book-input-author')).toBeDefined();
    expect(screen.getByTestId('edit-book-input-price')).toBeDefined();
  });

  test('Test Edit Book Form hide', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('edit-book-btn-1'));
    fireEvent.click(screen.getByTestId('edit-book-btn-1'));
    expect(screen.getByTestId('edit-book-input-title')).toBeDefined();

    fireEvent.click(screen.getByTestId('cancel-edit-book-btn'));
    const bookTitleLabel = screen.queryByText('Book Title');
    expect(bookTitleLabel).not.toBeInTheDocument();
  });

  test('Test Edit Book Form display for different books', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('edit-book-btn-1'));
    fireEvent.click(screen.getByTestId('edit-book-btn-1'));
    expect(screen.getByTestId('edit-book-input-title')).toBeDefined();
    const title1 = screen.getByLabelText('Book Title').closest('input')?.value;

    fireEvent.click(screen.getByTestId('edit-book-btn-2'));
    expect(screen.getByTestId('edit-book-input-title')).toBeDefined();
    const title2 = screen.getByLabelText('Book Title').closest('input')?.value;
    expect(title2).not.toEqual(title1);
  });
});
