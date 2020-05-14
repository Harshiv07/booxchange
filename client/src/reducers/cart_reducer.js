import {
    ADD_TO_CART,
    DELETE_FROM_CART,
    DELETE_ALL_FROM_CART,
    CLEAR_CART,
} from '../constants'

export const cartReducer = (state = [], action) => {
    const selectItemInCart = (state, action) =>
        action !== undefined && state.filter((x) => x._id === action._id)[0]
    const cartWithoutItem = (state, action) =>
        action !== undefined &&
        state.filter((x) => selectItemInCart(state, action) !== x)

    switch (action.type) {
        case ADD_TO_CART:
            return selectItemInCart(state, action.item)
                ? [
                      ...cartWithoutItem(state, action.item),
                      {
                          ...selectItemInCart(state, action.item),
                          quantity:
                              selectItemInCart(state, action.item).quantity + 1,
                      },
                  ]
                : [...state, { ...action.item, quantity: 1 }]

        case DELETE_FROM_CART:
            return action.item.quantity === 1
                ? [...cartWithoutItem(state, action.item)]
                : [
                      ...cartWithoutItem(state, action.item),
                      {
                          ...action.item,
                          quantity:
                              selectItemInCart(state, action.item).quantity - 1,
                      },
                  ]

        case DELETE_ALL_FROM_CART:
            return cartWithoutItem(state, action.item)

        case CLEAR_CART:
            return []

        default:
            return state
    }
}
