import { FC } from 'react'
import './search-field.css'

interface SearchFieldType {
    keyword: string,
    setKeyword: (input: string) => void
}

export const SearchField: FC<SearchFieldType> = ({keyword,setKeyword}) => {
    return (
        <div>
            <span className="search-title">Find your book</span> 
            <input className="search"
                key="random1"
                value={keyword}
                placeholder={"search book"}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    )
}
