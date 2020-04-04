import React, { Component } from 'react'
import Order from '../../Components/order/Order'

import axios from '../../axios-order'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount (){
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                this.setState({loading:false,orders:fetchedOrders})
            }).catch(res => {
                this.setState({loading:false})
            })
    }
    render (){
        return (
        <div>
            {this.state.orders.map(order => (
                <Order key={order.id} 
                    ingredients={order.ingredients}
                    price = {order.price}
                />
            ))}
        </div>
        )
    }
}

export default withErrorHandler(Orders,axios)