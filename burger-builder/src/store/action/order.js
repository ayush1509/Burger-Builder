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
    return {
        type: actionTypes.BURGER_PURCHASE,
        orderData: orderData,
        token: token
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
    return {
        type: actionTypes.FETCH_ORDER,
        token: token,
        userId: userId
    }
        
}