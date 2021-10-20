import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, waitFor, screen } from '@testing-library/react';
import MainPage from '../../components/pages/main-page';
import '@testing-library/jest-dom';

describe('Main page component tests', () => {
  test('Test Main page display', () => {
    render(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>,
    );
    waitFor(() => screen.getByText('Welcome to Book Store Main Page'));
    expect(
      screen.getByText('Welcome to Book Store Main Page'),
    ).toHaveTextContent('Welcome to Book Store Main Page');
  });
});
