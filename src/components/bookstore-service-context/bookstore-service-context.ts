import React from 'react';
import BookstoreService from '../../services/bookstore-service';


const value = new BookstoreService()

const MyContext = React.createContext(value)

export default MyContext;
