import * as actionType from '../action/actionTypes'

const initialState = {
    ingredients: null,
    total_price :  4,
    error: false,
    building: false
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                total_price: state.total_price + INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
        case actionType.REMOVE_INGREDIENT :
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                total_price: state.total_price - INGREDIENT_PRICE[action.ingredientName],
                building: true
            }
        case actionType.SET_INGREDIENT:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                total_price:4,
                building: false
            }
        case actionType.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
            }
        default :
            return state
    }
}
export default reducer