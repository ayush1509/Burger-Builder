import React, { Component } from 'react'
import CheckoutSummary from '../../Components/order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    state = {
        ingredients:null,
        total_price :0
    }

    componentWillMount (){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for (let params of query.entries()){
            if(params[0] === 'price'){
                price = params[1]
            }
            else {
                ingredients[params[0]] = +params[1]
            }
        }
        this.setState({ingredients:ingredients,total_price:price})

    }

    onCanceled = () => {
        this.props.history.goBack()
    }

    onContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render () {
        return (
            <div>
                <CheckoutSummary 
                continueHandler={this.onContinued} 
                cancelHandler= {this.onCanceled} ingredients={this.state.ingredients}/>
                <Route path={this.props.match.url + "/contact-data"} 
                    render={(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.total_price} {...props}/>)}/>

            </div>
        )
    }
}

export default Checkout