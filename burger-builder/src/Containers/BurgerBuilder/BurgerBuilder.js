import React, { Component } from 'react'

import Aux from '../../HOC/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICE = {
    salad: 1,
    bacon: 1,
    meat: 2,
    cheese: 2
}
class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        purchaseable: false,
        total_price : 4,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount (){
        axios.get('https://myburger-c11e5.firebaseio.com/ingredients.json')
        .then(response=>{
            console.log(response.data)
            this.setState({ingredients: response.data})
        }).catch(error => {
            this.setState({error:true})
        })
    }

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () => {
        // this.setState({loading:true})
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.total_price,
        //     customer: {
        //         name: "Ayush",
        //         address: {
        //             street: 'Jagriti Vihar',
        //             zipCode: '250001',
        //             country: 'India'
        //         },
        //         email: 'ayush@gmail.com',
        //     },
        //     deliveryMethod: 'fastest'

        // }
        // axios.post('/orders.json',order)
        // .then(response => {
        //     this.setState({loading:false,purchasing:false})
        // }).catch(error=>{
        //     this.setState({loading:false,purchasing:false})
        // })
        const queryParms = []
        for (let i in this.state.ingredients){
            queryParms.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParms.push('price='+this.state.total_price)
        const queryString = queryParms.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })
    }

    updatePurchase = (total_price) => {
        if (total_price > 4){
            this.setState({purchaseable: true})
            
        }
        else {
            this.setState({purchaseable:false})
        }
    }
    
    AddIngredientHandler = (type) => {
        const count = this.state.ingredients[type] + 1
        const newstate = {
            ...this.state.ingredients
        }
        newstate[type] = count
        const price = this.state.total_price + INGREDIENT_PRICE[type]
        this.setState({total_price:price,ingredients:newstate})
        this.updatePurchase(price)

    }

    RemoveIngredientHandler = (type) => {
        const count = this.state.ingredients[type] - 1
        const newstate = {
            ...this.state.ingredients
        }
        newstate[type] = count
        const price = this.state.total_price - INGREDIENT_PRICE[type]
        this.setState({total_price:price,ingredients:newstate})
        this.updatePurchase(price)

    }

    render (){
        const disableInf0 = {...this.state.ingredients}
        for (let key in disableInf0){
            disableInf0[key]= disableInf0[key]<=0
        }

        let orderSummary = null
        
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p>:<Spinner/>

        if (this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        addIngredient={this.AddIngredientHandler}
                        removeIngredient = {this.RemoveIngredientHandler}
                        disable = {disableInf0}
                        price = {this.state.total_price}
                        purchase = {this.state.purchaseable}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>)
                orderSummary = <OrderSummary ingredients={this.state.ingredients}
                price = {this.state.total_price}
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

export default withErrorHandler(BurgerBuilder,axios);