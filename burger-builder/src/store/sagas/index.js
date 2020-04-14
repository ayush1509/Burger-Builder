import { takeEvery } from 'redux-saga/effects'

import * as actionType from '../action/actionTypes'
import { logoutSaga, authLogoutSaga, authUserSaga, autoSignInSaga } from './auth'
import {initIngredientSaga} from './burgerBuilder'
import { burgerPurchaseSaga, fetchOrderSaga } from './order'

export function* watchAuth() {
    yield takeEvery(actionType.AUTH_INITIATE_LOGOUT,logoutSaga)
    yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, authLogoutSaga)
    yield takeEvery(actionType.AUTH_USER, authUserSaga)
    yield takeEvery(actionType.AUTH_CHECK_STATE, autoSignInSaga)
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionType.INIT_INGREDIENT,initIngredientSaga)
}

export function* watchOrder(){
    yield takeEvery(actionType.FETCH_ORDER, fetchOrderSaga)
    yield takeEvery(actionType.BURGER_PURCHASE, burgerPurchaseSaga)
}

