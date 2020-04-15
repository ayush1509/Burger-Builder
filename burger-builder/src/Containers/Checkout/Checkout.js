import React from 'react'
import {connect} from 'react-redux'

import CheckoutSummary from '../../Components/order/CheckoutSummary/CheckoutSummary'
import { Route ,Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'

const Checkout = props => {
    const onCanceled = () => {
        props.history.goBack()
    }

    const onContinued = () => {
        props.history.replace('/checkout/contact-data')
    }
        let summary = <Redirect to='/'/>

        if (props.ings){
            const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients ={props.ings}
                        continueHandler={onContinued} 
                        cancelHandler= {onCanceled} />
                    <Route path={props.match.url + "/contact-data"} 
                        component={ContactData}/>
                </div>
            )
        }
        return summary
    }


const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)