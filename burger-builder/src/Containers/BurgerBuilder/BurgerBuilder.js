import React, { Component } from 'react'
import Aux from '../../HOC/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE = {
    salad: 1,
    bacon: 1,
    meat: 2,
    cheese: 2
}
class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
    total_price : 4
    }
    
    AddIngredientHandler = (type) => {
        const count = this.state.ingredients[type] + 1
        const newstate = {
            ...this.state.ingredients
        }
        newstate[type] = count
        const price = this.state.total_price + INGREDIENT_PRICE[type]
        this.setState({total_price:price,ingredients:newstate})

    }

    RemoveIngredientHandler = (type) => {
        const count = this.state.ingredients[type] - 1
        const newstate = {
            ...this.state.ingredients
        }
        newstate[type] = count
        const price = this.state.total_price - INGREDIENT_PRICE[type]
        this.setState({total_price:price,ingredients:newstate})

    }

    render (){
        const disableInf0 = {...this.state.ingredients}
        for (let key in disableInf0){
            disableInf0[key]= disableInf0[key]<=0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.AddIngredientHandler}
                removeIngredient = {this.RemoveIngredientHandler}
                disable = {disableInf0}
                price = {this.state.total_price}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;