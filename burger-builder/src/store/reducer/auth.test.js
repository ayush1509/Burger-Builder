import * as actionTypes from '../action/actionTypes'
import reducer from './auth'

describe('auth reducer',()=>{
    it('should return the initial state',()=> {
        expect(reducer(undefined,{})).toEqual({
            error: null,
            loading: false,
            token: null,
            userId:null,
            authRedirectPath: '/'
        })
    })
    it('should store token upon login',()=>{
        expect(reducer({
            error: null,
            loading: false,
            token: '',
            userId: '',
            authRedirectPath: '/'
        },{
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'qwe',
            userId: 'qwe'
        })).toEqual({
            error: null,
            loading: false,
            token: 'qwe',
            userId: 'qwe',
            authRedirectPath: '/'
        })
    })
})