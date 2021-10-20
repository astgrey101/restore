import React from 'react';
import {
  render, waitFor, screen, fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store';
import App from '../../components/app';

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

describe('App Switch between directories tests', () => {
  test('Switch to Catalog tab test', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('link-to-catalog'));
    await waitFor(() => screen.getByTestId('book-1'));
    await waitFor(() => screen.getByTestId('book-2'));

    expect(screen.getByTestId('book-1')).toHaveTextContent('Alyce Johnston');
    expect(screen.getByTestId('book-2')).toHaveTextContent('Theresa Farley');
  });

  test('Switch to Card tab test', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('link-to-shopping-cart'));
    await waitFor(() => screen.getByText('Your Order'));

    expect(screen.getByTestId('shopping-cart-item-header')).toBeDefined();
    expect(screen.getByTestId('shopping-cart-title-header')).toBeDefined();
    expect(screen.getByTestId('shopping-cart-count-header')).toBeDefined();
    expect(screen.getByTestId('shopping-cart-price-header')).toBeDefined();
    expect(screen.getByTestId('shopping-cart-action-header')).toBeDefined();
  });

  test('Switch to Catalog tab and back to Main page test', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('link-to-catalog'));
    await waitFor(() => screen.getByTestId('book-1'));

    fireEvent.click(screen.getByTestId('link-to-main-page'));
    await waitFor(() => screen.getByText('Welcome to Book Store Main Page'));
    expect(
      screen.getByText('Welcome to Book Store Main Page'),
    ).toBeDefined();
  });
});
