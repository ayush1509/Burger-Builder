import React, { useEffect} from 'react'
import Order from '../../Components/order/Order'
import {connect} from 'react-redux'

import axios from '../../axios-order'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import * as actions from '../../store/action/index'
import Spinner from '../../Components/UI/Spinner/Spinner'

const Orders = props => {

    useEffect(()=>{
        props.onFetchOrder(props.token,props.userId)
    },[])

        let fetchedOrders = <Spinner/>
        if (!props.loading){
            fetchedOrders = props.orders.map(order => (
                <Order key={order.id} 
                    ingredients={order.ingredients}
                    price = {order.price}/>
            ))
        }
        return (
        <div>
            {fetchedOrders}
        </div>
        )
    }


const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token,userId) => dispatch(actions.fetchOrder(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))