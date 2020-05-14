import { USER_ADDRESS, LOGIN_USER } from '../constants.js'

export const getUserAddress = (state = {}, action) => {
    switch (action.type) {
        case USER_ADDRESS:
            return action.infoUser

        default:
            return state
    }
}

export const isLoggedIn = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return action.logUser

        default:
            return state
    }
}
