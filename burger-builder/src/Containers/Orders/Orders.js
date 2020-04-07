import React, { Component } from 'react'
import Order from '../../Components/order/Order'
import {connect} from 'react-redux'

import axios from '../../axios-order'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import * as actions from '../../store/action/index'
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component {

    componentDidMount (){
        this.props.onFetchOrder()        
    }
    render (){
        let fetchedOrders = <Spinner/>
        if (!this.props.loading){
            fetchedOrders = this.props.orders.map(order => (
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
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: () => dispatch(actions.fetchOrder())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))