import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import App from './components/app';
import MyContext from './components/bookstore-service-context';
import ErrorBoundary from './components/error-boundary';
import BookstoreService from './services/bookstore-service';
import { persistor, store } from './store';

const bookstoreService = new BookstoreService();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ErrorBoundary>
        <MyContext.Provider value={bookstoreService}>
          <Router>
            <App />
          </Router>
        </MyContext.Provider>
      </ErrorBoundary>
    </PersistGate>

  </Provider>,
  document.getElementById('root'),
);
