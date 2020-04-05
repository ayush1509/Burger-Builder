import * as actionType from './action'

const initialState = {
    ingredients: {
        cheese:0,
        meat:0,
        bacon:0,
        salad:0
    },
    total_price :  4
}

const INGREDIENT_PRICE = {
    salad: 1,
    bacon: 1,
    meat: 2,
    cheese: 2
}

const reducer = (state = initialState,action) => {
    switch (action.type){
        case actionType.ADD_INGREDIENT :
            console.log(action.ingredientName)
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                total_price: state.total_price + INGREDIENT_PRICE[action.ingredientName]
            }
        case actionType.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                total_price: state.total_price - INGREDIENT_PRICE[action.ingredientName]
            }
        default :
            return state
    }
}
export default reducer