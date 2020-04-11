import * as actionTypes from './actionTypes'
import axios from 'axios'

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

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expireDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const logout = (expiration) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout())
        },expiration * 1000)
    }
}

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email:email,
            password: password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkHw5prsQjnxn_18QQN-AfbDK8ndZ3BbM'
        if (!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkHw5prsQjnxn_18QQN-AfbDK8ndZ3BbM'
        }
        axios.post(url,authData)
        .then(response => {
            const expireDate = new Date(new Date().getDate() + response.data.expiresIn)
            localStorage.setItem('token',response.data.idToken)
            localStorage.setItem('expireDate',expireDate)
            localStorage.setItem('userId',response.data.localId)
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(logout(response.data.expiresIn))
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error))
        })
    }
}
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const autoSignIn = () => {
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
           dispatch(authLogout()) 
        }
        else {
            const expireDate = new Date(localStorage.getItem('expireDate'))
            if (expireDate> new Date()){
                const userId = localStorage.getItem('userId')
                const remTime = ((expireDate.getTime()-new Date().getTime()) / 1000)
                dispatch(authSuccess(token,userId))
                dispatch(logout(remTime))

            }
            else {
                dispatch(authLogout())

            }

        }
    }

}