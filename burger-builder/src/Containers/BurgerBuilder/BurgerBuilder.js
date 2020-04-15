import React, { useState, useEffect } from 'react'
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


export const BurgerBuilder = props =>  {
    const [ purchasing, setPurchasing] = useState(false)

    useEffect( ()=>{
        props.onSetIngredients()
        
    },[])

    const purchaseHandler = () =>{
        if(props.isAuthenticated){
            setPurchasing(true)
        }
        else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
        
    }
    const purchaseCancelHandler = () =>{
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        props.onPurchasedInit()
        props.history.push('./checkout')
    }

    const updatePurchase = ( ingredients) => {
        const sum = Object.keys(ingredients)
            .map( igkey => {
                return ingredients[igkey]
            })
            .reduce( (sum,el)=>{
                return sum+el
            },0)
        return sum>0
        
    }
    

        const disableInf0 = {...props.ings}
        for (let key in disableInf0){
            disableInf0[key]= disableInf0[key]<=0
        }

        let orderSummary = null
        
        
        let burger = props.error ? <p>Ingredients can't be loaded!</p>:<Spinner/>

        if (props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls 
                        addIngredient={props.onAddIngredients}
                        removeIngredient = {props.onRemoveIngredients}
                        disable = {disableInf0}
                        price = {props.price}
                        purchase = {updatePurchase(props.ings)}
                        ordered = {purchaseHandler}
                        isAuthenticated = {props.isAuthenticated}
                    />
                </Aux>)
                orderSummary = <OrderSummary ingredients={props.ings}
                price = {props.price}
                canceled={purchaseCancelHandler}
                continued={purchaseContinueHandler}/>
    
        }

        return (
            <Aux>
                <Modal show={purchasing} cancel={purchaseCancelHandler}>
                    {orderSummary}        
                </Modal>
                {burger}
                
            </Aux>
        );
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