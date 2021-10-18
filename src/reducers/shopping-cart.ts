export interface ShoppingCartType {
    cartItems: {
        [id: number] : {id: number, amount: number}
    }
}

export interface BookPayloadType {
  type: string,
  payload: {
    bookId: number,
    amount: number
  }
}

const initialState = {
  cartItems: {},
};

const shoppingCart = (
  state: ShoppingCartType = initialState, action: BookPayloadType,
): ShoppingCartType => {
  switch (action.type) {
    case 'BOOK_ADDED_TO_CART': {
      const currentAmount = state.cartItems[action.payload.bookId]?.amount ?? 0;
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.bookId]: {
            id: action.payload.bookId,
            amount: currentAmount + action.payload.amount,
          },
        },
      };
    }

    case 'BOOK_REMOVED_TO_CART': {
      const currentAmount = state.cartItems[action.payload.bookId]?.amount ?? 0;
      if (currentAmount === 1) {
        const { [action.payload.bookId]: deletedItem, ...otherItems } = state.cartItems;
        return {
          ...state,
          cartItems: {
            ...otherItems,
          },
        };
      }
      return {
        ...state,
        cartItems: {
          ...state.cartItems,
          [action.payload.bookId]: {
            id: action.payload.bookId,
            amount: currentAmount + action.payload.amount,
          },
        },
      };
    }

    case 'ALL_BOOKS_REMOVED_TO_CART': {
      const { [action.payload.bookId]: deletedItem, ...otherItems } = state.cartItems;
      return {
        ...state,
        cartItems: {
          ...otherItems,
        },
      };
    }

    default:
      return state;
  }
};

export default shoppingCart;
