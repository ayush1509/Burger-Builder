import React, { Component } from 'react'
import {connect} from 'react-redux'

import CheckoutSummary from '../../Components/order/CheckoutSummary/CheckoutSummary'
import { Route ,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
    onCanceled = () => {
        this.props.history.goBack()
    }

    onContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render () {
        let summary = <Redirect to='/'/>

        if (this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients ={this.props.ings}
                        continueHandler={this.onContinued} 
                        cancelHandler= {this.onCanceled} />
                    <Route path={this.props.match.url + "/contact-data"} 
                        component={ContactData}/>
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)