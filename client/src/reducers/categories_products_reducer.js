import { CATEGORIES_PRODUCTS } from '../constants.js'

const defaultState = {
    books: ['Scifi', 'Novel', 'Self-Help'],
    notes: ['Handwritten', 'Printed'],
    tutorials: ['Classroom', 'Private'],
}

export const categoriesProducts = (state = defaultState, action) => {
    switch (action.type) {
        case CATEGORIES_PRODUCTS:
            return state

        default:
            return state
    }
}
