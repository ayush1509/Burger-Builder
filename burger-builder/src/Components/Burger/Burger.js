import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'
const burger = (props) => {
    const transformedIngredient = Object.keys(props.ingredients).map(
       igkey =>{
         return [...Array(props.ingredients[igkey])].map((_, i)=>{
             return <BurgerIngredient key={igkey + i} type = {igkey}/>
         }) 
       } 
    )
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {console.log(transformedIngredient)}
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default burger;