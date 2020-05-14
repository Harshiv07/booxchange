import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {
    listFetchDataSuccess,
    listHasError,
    listIsLoading,
    sortArgsForFilter,
    keywordsForFilter,
    sortAllForFilter,
    itemFetchDataSuccess,
    itemHasError,
    itemIsLoading,
    reducerPriceRangeFilter,
} from './reducers/list_fetch_reducer'
import { categoriesProducts } from './reducers/categories_products_reducer'
import { cartReducer } from './reducers/cart_reducer'
import { getUserAddress, isLoggedIn } from './reducers/users_reducer'

const rootReducer = combineReducers({
    listFetchDataSuccess,
    itemFetchDataSuccess,
    listHasError,
    listIsLoading,
    itemHasError,
    itemIsLoading,
    sortArgsForFilter,
    keywordsForFilter,
    sortAllForFilter,
    categoriesProducts,
    cartReducer,
    reducerPriceRangeFilter,
    getUserAddress,
    isLoggedIn,
})

export const Store = createStore(rootReducer, applyMiddleware(thunk))
