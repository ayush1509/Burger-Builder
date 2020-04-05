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
import * as actionType from '../../store/action'


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount (){
        // axios.get('https://myburger-c11e5.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     console.log(response.data)
        //     this.setState({ingredients: response.data})
        // }).catch(error => {
        //     this.setState({error:true})
        // })
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
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
        
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p>:<Spinner/>

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
                    />
                </Aux>)
                orderSummary = <OrderSummary ingredients={this.props.ings}
                price = {this.props.price}
                canceled={this.purchaseCancelHandler}
                continued={this.purchaseContinueHandler}/>
    
        }
        if (this.state.loading){
            orderSummary = <Spinner/>
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
        ings: state.ingredients,
        price: state.total_price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ing)=> dispatch({type: actionType.ADD_INGREDIENT, ingredientName:ing}),
        onRemoveIngredients: (ing)=> dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName:ing})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));