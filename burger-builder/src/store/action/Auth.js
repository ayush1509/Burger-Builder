import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error : error
    }
}

export const authLogoutSucced = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const authLogout = () => {
    // localStorage.removeItem('token')
    // localStorage.removeItem('userId')
    // localStorage.removeItem('expireDate')
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}


export const logout = (expiration) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expiration
    }
}

export const auth = (email,password,isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup

    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const autoSignIn = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}