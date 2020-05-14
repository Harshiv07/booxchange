import {
    USER_ADDRESS,
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../constants.js'

export const addUserAddress = (infoUser) => ({
    type: USER_ADDRESS,
    infoUser,
})
export const loginUser = (logUser) => ({
    type: LOGIN_USER,
    logUser,
})

export const signupUser = (regUser) => ({
    type: SIGNUP_USER,
    regUser,
})

export const authUser = (auth) => ({
    type: AUTH_USER,
    auth,
})

export const logoutUser = (logOUser) => ({
    type: LOGOUT_USER,
    logOUser,
})
