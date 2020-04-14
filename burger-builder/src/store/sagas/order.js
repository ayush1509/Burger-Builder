import { put } from "redux-saga/effects"
import axios from '../../axios-order'

import * as actions from '../action/index'

export function* burgerPurchaseSaga(action){
    yield put(actions.burgerPurchaseStart())
    try {
        const response = yield axios.post( '/orders.json?auth='+action.token, action.orderData )
        yield put(actions.burgerPurchaseSuccess(response.data.name,action.orderData))
            
    }
    catch (error){
        yield put(actions.burgerPurchaseFail(error))
    }
}

export function* fetchOrderSaga(action) {
    yield put(actions.fetchOrderStart())
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"' 
    try{
        const response = yield axios.get('/orders.json'+queryParams)  
        const fetchedOrders = [];
        for (let key in response.data){
            fetchedOrders.push({...response.data[key],id:key})
        }
        yield put(actions.fetchOrderSuccess(fetchedOrders))
    }
    catch (error){
        yield put(actions.fetchOrderFail(error))
    }
}