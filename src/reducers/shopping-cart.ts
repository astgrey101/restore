import { BookPayloadType } from "../actions"

interface ShoppingCartType {
    cartItems: {
        [id: number] : {id: number, amount: number}
    }
}

const initialState = {
    cartItems: {}
}

const shoppingCart = (state: ShoppingCartType = initialState, action: BookPayloadType) => {

    switch(action.type) {
        
        case 'BOOK_ADDED_TO_CART': {
            const currentAmmount = state.cartItems[action.payload!.bookId]?.amount ?? 0
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [action.payload!.bookId]: {
                        id: action.payload!.bookId,
                        amount: currentAmmount + action.payload!.amount
                    }
                }
                
            }
        }
            

        case 'BOOK_REMOVED_TO_CART': {
            const currentAmmount = state.cartItems[action.payload!.bookId]?.amount ?? 0
            if(currentAmmount === 1) {
                delete state.cartItems[action.payload!.bookId]
                return {
                    ...state,
                    cartItems: {
                        ...state.cartItems
                    }
                    
                }
            }
            return {
                ...state,
                cartItems: {
                    ...state.cartItems,
                    [action.payload!.bookId]: {
                        id: action.payload!.bookId,
                        amount: currentAmmount + action.payload!.amount
                    }
                }
                
            }
        }

        case 'ALL_BOOKS_REMOVED_TO_CART':
                delete state.cartItems[action.payload!.bookId]
                return {
                    ...state,
                    cartItems: {
                        ...state.cartItems
                    }
                    
                }


        default:
            return state
    }
}

export default shoppingCart