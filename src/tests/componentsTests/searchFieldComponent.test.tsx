import React from 'react';
import '@testing-library/jest-dom';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
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

describe('Search Field component tests', () => {
  test('Search Field display test', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getAllByTestId('search-field'));

    expect(screen.getByTestId('search-field')).toBeDefined();
  });

  test('Search by correct value test', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('search-field'));
    const inputField = screen.getByTestId('search-field');
    fireEvent.change(inputField, { target: { value: 'Reprehenderit est esse labore aute consequat.' } });

    expect(screen.getByTestId('book-1')).toBeDefined();
    const secondBookTitle = screen.queryByText('In est exercitation minim fugiat dolor minim sunt tempor.');
    expect(secondBookTitle).not.toBeInTheDocument();
  });

  test('Search by incorrect value test', async () => {
    render(
      <Provider store={store}>
        <BookListContainer />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('search-field'));
    const inputField = screen.getByTestId('search-field');
    fireEvent.change(inputField, { target: { value: 'incorrect value' } });
    const firstBookTitle = screen.queryByText('Reprehenderit est esse labore aute consequat.');
    const secondBookTitle = screen.queryByText('In est exercitation minim fugiat dolor minim sunt tempor.');
    expect(firstBookTitle).not.toBeInTheDocument();
    expect(secondBookTitle).not.toBeInTheDocument();
  });
});
