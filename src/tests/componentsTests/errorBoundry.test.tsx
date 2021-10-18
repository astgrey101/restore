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
import MyContext from '../../components/bookstore-service-context';
import ErrorBoundary from '../../components/error-boundary';
import BookstoreService from '../../services/bookstore-service';

const server = setupServer(
  rest.get('http://localhost:8000/books',
    (
      req,
      res,
      ctx,
    ) => res(ctx.status(404))),
);

afterEach(() => server.resetHandlers());
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Error boundary component tests', () => {
  test('Error boundary display test', async () => {
    const bookstoreService = new BookstoreService();
    render(
      <Provider store={store}>
        <ErrorBoundary>
          <MyContext.Provider value={bookstoreService}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </MyContext.Provider>
        </ErrorBoundary>
      </Provider>,
    );
    fireEvent.click(screen.getByTestId('link-to-catalog'));
    await waitFor(() => screen.getByTestId('error'));

    expect(screen.getByTestId('error')).toHaveTextContent('Error!');
  });
});
