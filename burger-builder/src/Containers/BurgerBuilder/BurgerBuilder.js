import React, { Component } from 'react'
import { connect } from 'react-redux'

import Aux from '../../HOC/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/action/index'


export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount (){
        this.props.onSetIngredients()
        
    }

    purchaseHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true})
        }
        else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push('/auth')
        }
        
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        this.props.onPurchasedInit()
        this.props.history.push('./checkout')
    }

    updatePurchase = ( ingredients) => {
        const sum = Object.keys(ingredients)
            .map( igkey => {
                return ingredients[igkey]
            })
            .reduce( (sum,el)=>{
                return sum+el
            },0)
        return sum>0
        
    }
    

    render (){
        const disableInf0 = {...this.props.ings}
        for (let key in disableInf0){
            disableInf0[key]= disableInf0[key]<=0
        }

        let orderSummary = null
        
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p>:<Spinner/>

        if (this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        addIngredient={this.props.onAddIngredients}
                        removeIngredient = {this.props.onRemoveIngredients}
                        disable = {disableInf0}
                        price = {this.props.price}
                        purchase = {this.updatePurchase(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        isAuthenticated = {this.props.isAuthenticated}
                    />
                </Aux>)
                orderSummary = <OrderSummary ingredients={this.props.ings}
                price = {this.props.price}
                canceled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}/>
    
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
                    {orderSummary}        
                </Modal>
                {burger}
                
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.total_price,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ing)=> dispatch(burgerBuilderActions.addIngredient(ing)),
        onRemoveIngredients: (ing)=> dispatch(burgerBuilderActions.removeIngredient(ing)),
        onSetIngredients: ()=> dispatch(burgerBuilderActions.initIngredient()),
        onPurchasedInit: ()=> dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath: (path)=> dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));