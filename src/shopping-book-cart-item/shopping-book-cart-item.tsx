import './shopping-book-cart-item.css';
import { useDispatch, useSelector } from 'react-redux'
import { 
    bookAddedToCart, 
    bookRemovedFromCart, 
    allbooksRemovedFromCart } from '../actions'
import { getBookItemById } from '../reducers/selectors';
import { FC } from 'react';
import { useMemo } from 'react';

interface ShoppingBookCartItemType {
  item: 
      {id: number, 
      amount: number
    }
  idx: number
}

const ShoppingBookCartItem: FC<ShoppingBookCartItemType> = ({item, idx}) => {

    const dispatch = useDispatch()
  
    const { id, amount } = item;

    const bookItem = useSelector(useMemo(() => getBookItemById(item.id), [item.id]))
  
    if (!bookItem) {
      return <></>
    }
    const { title, price, coverImage } = bookItem
  
    return (
      <tr key={id}>
        <td>{idx + 1}</td>
        <td>
            <div className="book-coverage">
              <img src={coverImage} alt="cover" />
          </div>
        </td>
        <td>{title}</td>
        <td>{amount}</td>
        <td>${price*amount}</td>
        <td>
          <button 
            onClick={() => dispatch(allbooksRemovedFromCart(id))}
            className="btn btn-outline-danger btn-sm float-right">
            <i className="fa fa-trash-o" />
          </button>
          <button 
            onClick={() => dispatch(bookAddedToCart(id))}
            className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-plus-circle" />
          </button>
          <button 
            onClick={() => dispatch(bookRemovedFromCart(id))}
            className="btn btn-outline-warning btn-sm float-right">
            <i className="fa fa-minus-circle" />
          </button>
        </td>
     </tr>
    )
  }

  export default ShoppingBookCartItem