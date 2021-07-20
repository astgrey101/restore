import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/app'
import MyContext from './components/bookstore-service-context';
import ErrorBoundry from './components/error-boundary'
import BookstoreService from './services/bookstore-service'
import store from './store'


const bookstoreService = new BookstoreService()



ReactDOM.render(
    <Provider store={store}>
        <ErrorBoundry>
            <MyContext.Provider value={bookstoreService}>
                <Router>
                    <App/>
                </Router>
            </MyContext.Provider>
        </ErrorBoundry>
    </Provider>
    ,document.getElementById('root'));

