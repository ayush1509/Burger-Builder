import axios from '../../axios-order'
import * as actionTypes from './actionTypes'
export const burgerPurchaseSuccess = (id,orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        id: id,
        orderData: orderData
    }
}

export const burgerPurchaseFail = (error) => {
    return {
        type:actionTypes.BURGER_PURCHASE_FAIL,
        error: error
    }
}

export const burgerPurchase = (orderData,token) => {
    return dispatch => {
        dispatch(burgerPurchaseStart())
        axios.post( '/orders.json?auth='+token, orderData )
            .then( response => {
                dispatch(burgerPurchaseSuccess(response.data.name,orderData))
            } )
            .catch( error => {
                dispatch(burgerPurchaseFail(error))
            } );
    }
    
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrder = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"' 
        axios.get('/orders.json'+queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                dispatch(fetchOrderSuccess(fetchedOrders))
            }).catch(res => {
                dispatch(fetchOrderFail(res))
            })
    }
}