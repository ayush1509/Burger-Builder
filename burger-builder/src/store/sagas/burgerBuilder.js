import { put } from "redux-saga/effects"
import axios from '../../axios-order'

import * as actions from '../action/index'

export function* initIngredientSaga(action){
    try {
        const response = yield axios.get('https://myburger-c11e5.firebaseio.com/ingredients.json')
        yield put(actions.setIngredient(response.data))
    }
    catch (error){
        yield put(actions.fetchedIngredientFailed())
    }
}