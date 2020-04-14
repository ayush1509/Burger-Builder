import { put, delay } from 'redux-saga/effects'
import * as actions from '../action/index'
import axios from 'axios'

export function* logoutSaga(action) {
    yield localStorage.removeItem('token')
    yield localStorage.removeItem('userId')
    yield localStorage.removeItem('expireDate')
    yield put(actions.authLogoutSucced()) 

} 

export function* authLogoutSaga(action){
    yield delay(action.expirationTime * 1000)
    yield put(actions.authLogout())

}

export function* authUserSaga(action){
    yield put(actions.authStart())
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCkHw5prsQjnxn_18QQN-AfbDK8ndZ3BbM'
        if (!action.isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCkHw5prsQjnxn_18QQN-AfbDK8ndZ3BbM'
        }
        try {
            const response = yield axios.post(url,authData)
            
            const expireDate = yield new Date(new Date().getDate() + response.data.expiresIn)
            yield localStorage.setItem('token',response.data.idToken)
            yield localStorage.setItem('expireDate',expireDate)
            yield localStorage.setItem('userId',response.data.localId)
            yield put(actions.authSuccess(response.data.idToken,response.data.localId))
            yield put(actions.logout(response.data.expiresIn))
        }
        catch (error){
            yield put(actions.authFail(error.response.data.error))
        }
}

export function* autoSignInSaga (action){
    const token = yield localStorage.getItem('token')
        if(!token){
           yield put(actions.authLogout()) 
        }
        else {
            const expireDate = yield new Date(localStorage.getItem('expireDate'))
            if (expireDate> new Date()){
                const userId = yield localStorage.getItem('userId')
                const remTime = ((expireDate.getTime()-new Date().getTime()) / 1000)
                yield put(actions.authSuccess(token,userId))
                yield put(actions.logout(remTime))

            }
            else {
                yield put(actions.authLogout())

            }

        }
}