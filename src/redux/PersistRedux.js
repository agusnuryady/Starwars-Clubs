import { createReducer, createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    registerRequest: ['data'],
    registerSuccess: ['data'],
    registerFailure: ['err'],
    loginRequest: ['data', 'callback'],
    loginSuccess: ['data'],
    loginFailure: ['err'],
    logoutRequest: ['callbak'],
    logoutSuccess: ['data'],
    logoutFailure: ['err'],
    locationRequest: ['data'],
    locationSuccess: ['data'],
    locationFailure: ['err'],
})

export const PersistTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
    users: [],
    authUser: null,
    fetchingUser: false,
    fetchingAuth: false,
    successUser: false,
    successAuth: false,
    errUser: null,
    errAuth: null
}

/* ------------- Reducers ------------- */

export const requestUser = (state) => {
    return {
        ...state,
        fetchingUser: true,
        successUser: false,
        errUser: null,
    }
}

export const requestAuth = (state) => {
    return {
        ...state,
        fetchingAuth: true,
        successAuth: false,
        errAuth: null,
    }
}

export const failureUser = (state, { err }) => {
    return {
        ...state,
        fetchingUser: false,
        successUser: false,
        errUser: err
    }
}

export const failureAuth = (state, { err }) => {
    return {
        ...state,
        fetchingAuth: false,
        successAuth: false,
        errAuth: err
    }
}

export const successUser = (state, { data }) => {
    return {
        ...state,
        fetchingUser: false,
        successUser: true,
        errUser: null,
        users: data
    }
}

export const successAuth = (state, { data }) => {
    return {
        ...state,
        fetchingAuth: false,
        successAuth: true,
        errAuth: null,
        authUser: data
    }
}

export const successLogout = (state) => {
    return {
        ...state,
        fetchingAuth: false,
        successAuth: true,
        errAuth: null,
        authUser: null
    }
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.REGISTER_REQUEST]: requestUser,
    [Types.REGISTER_SUCCESS]: successUser,
    [Types.REGISTER_FAILURE]: failureUser,
    [Types.LOGIN_REQUEST]: requestAuth,
    [Types.LOGIN_SUCCESS]: successAuth,
    [Types.LOGIN_FAILURE]: failureAuth,
    [Types.LOGOUT_REQUEST]: requestAuth,
    [Types.LOGOUT_SUCCESS]: successLogout,
    [Types.LOGOUT_FAILURE]: failureAuth,
    [Types.LOCATION_REQUEST]: requestUser,
    [Types.LOCATION_SUCCESS]: successUser,
    [Types.LOCATION_FAILURE]: failureUser
})