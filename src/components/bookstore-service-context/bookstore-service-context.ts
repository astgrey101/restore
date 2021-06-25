import React from 'react';
import BookstoreService from '../../services/bookstore-service';


const value = new BookstoreService()

const {
  Provider: BookstoreServiceProvider,
  Consumer: BookstoreServiceConsumer
} = React.createContext(value);

export {
  BookstoreServiceProvider,
  BookstoreServiceConsumer
};
