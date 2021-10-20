import React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import {
  render, waitFor, screen, fireEvent, act,
} from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { store } from '../../store';
import AddBookForm from '../../components/add-book-form';

const server = setupServer(
  rest.post('http://localhost:8000/books',
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json({}),
    )),
  rest.get('http://localhost:8000/books',
    (
      req,
      res,
      ctx,
    ) => res(
      ctx.json({}),
    )),
);

afterEach(() => server.resetHandlers());
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Add book form component tests', () => {
  test('Add book form display test', async () => {
    render(
      <Provider store={store}>
        <AddBookForm />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('add-book-input-title'));

    expect(screen.getByTestId('add-book-input-title')).toBeDefined();
    expect(screen.getByTestId('add-book-input-author')).toBeDefined();
    expect(screen.getByTestId('add-book-input-price')).toBeDefined();
    expect(screen.getByTestId('add-book-input-image')).toBeDefined();
    expect(screen.getByTestId('add-book-submit-btn')).toHaveValue('Add new book');
  });

  test('Add book form validation test', async () => {
    render(
      <Provider store={store}>
        <AddBookForm />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('add-book-input-title'));
    fireEvent.click(screen.getByTestId('add-book-submit-btn'));

    await waitFor(() => screen.getByText('Book Title should be filled in'));
    expect(screen.getByText('Book Title should be filled in')).toBeDefined();
    expect(screen.getByText('Book Author should be filled in')).toBeDefined();
    expect(screen.getByText('Book Price should be filled in')).toBeDefined();
    expect(screen.getByText('Image should be uploaded')).toBeDefined();
  });

  test('Add book form validation with negative price test', async () => {
    render(
      <Provider store={store}>
        <AddBookForm />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('add-book-input-title'));
    const inputPriceField = screen.getByTestId('add-book-input-price');
    await act(
      async () => {
        await waitFor(() => fireEvent.change(inputPriceField, { target: { value: -100 } }));
        await waitFor(() => fireEvent.click(screen.getByTestId('add-book-submit-btn')));
      },
    );
    await act(
      async () => {
        await expect(screen.getByTestId('add-book-input-price')).toHaveValue(-100);
        await expect(screen.getByText('Book Price should be positive number')).toBeDefined();
      },
    );
  });

  test('Add book test', async () => {
    jest.useFakeTimers();
    render(
      <Provider store={store}>
        <AddBookForm />
      </Provider>,
    );
    await waitFor(() => screen.getByTestId('add-book-input-title'));
    const file = new File([''], 'chucknorris.png', { type: 'image/png' });
    const uploader = screen.getByTestId('add-book-input-image');
    await act(
      async () => {
        await waitFor(() => fireEvent.change(uploader, { target: { files: [file] } }));
      },
    );
    const image = screen.getByTestId('add-book-image') as HTMLImageElement;
    image.src = 'http://lorempixel.com/300/500/technics/5/';
    await waitFor(() => expect(screen.getByTestId('add-book-image')).toBeDefined());

    const inputTitleField = screen.getByTestId('add-book-input-title');
    fireEvent.change(inputTitleField, { target: { value: 'Test est esse labore aute consequat.' } });

    const inputAuthorField = screen.getByTestId('add-book-input-author');
    fireEvent.change(inputAuthorField, { target: { value: 'Test Johnston' } });

    const inputPriceField = screen.getByTestId('add-book-input-price');
    fireEvent.change(inputPriceField, { target: { value: 100 } });

    fireEvent.click(screen.getByTestId('add-book-submit-btn'));

    await waitFor(() => expect(screen.getByText('Book successfully added')).toBeDefined());
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(screen.queryByText('Book successfully added')).toBeNull());
    await waitFor(() => expect(screen.getByTestId('add-book-input-title')).toHaveValue(''));
    jest.useRealTimers();
  });
});
