import React, { FC } from 'react';
import './search-field.css';

interface SearchFieldType {
    keyword: string,
    setKeyword: any
}

const SearchField: FC<SearchFieldType> = ({ keyword, setKeyword }) => (
  <div className="search-field">
    <span className="search-title">Find your book</span>
    <input
      className="search"
      key="random1"
      value={keyword}
      placeholder="search book"
      onChange={(e) => setKeyword(e.target.value)}
    />
  </div>
);

export default SearchField;
