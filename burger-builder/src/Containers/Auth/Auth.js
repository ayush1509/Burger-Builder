import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.css';
import * as actions from '../../store/action/index'
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

const Auth = props => {
    const [authForm ,setAuthForm] =useState ({
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        })
        const [ isSignup,setIsSignup] = useState(true)
    
    useEffect (()=>{
        if(!props.buildingBurger && props.authRedirectPath !=='/'){
            props.onSetAuthRedirectPath()
        }

    },[])

    const checkValidity = ( value, rules ) => {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    const inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity( event.target.value, authForm[controlName].validation ),
                touched: true
            }
        };
        setAuthForm(updatedControls)
    }

    const submitHandler = ( event ) => {
        event.preventDefault();
        props.onAuth( authForm.email.value, authForm.password.value, isSignup );
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup)
    }


        const formElementsArray = [];
        for ( let key in authForm ) {
            formElementsArray.push( {
                id: key,
                config: authForm[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );

        if (props.loading){
            form = <Spinner/>
        }

        let err = null
        if(props.error){
            err = (
                <p>{props.error.message}</p>
            )
        }
        let redirectHome = null
        if(props.isAuthenticated){
            redirectHome = <Redirect to= {props.authRedirectPath} />  
            
        }

        return (
            <div className={classes.Auth}>
                {redirectHome}
                {err}
                <form onSubmit={submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                    clicked={switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }


const mapStateToProp = state => {
    return {
        error: state.auth.error,
        loading: state.auth.loading,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProp, mapDispatchToProps )( Auth );