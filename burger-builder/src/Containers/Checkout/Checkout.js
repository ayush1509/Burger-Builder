import React, { Component } from 'react'
import {connect} from 'react-redux'

import CheckoutSummary from '../../Components/order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {
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
                cancelHandler= {this.onCanceled} ingredients={this.props.ings}/>
                <Route path={this.props.match.url + "/contact-data"} 
                    component={ContactData}/>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)