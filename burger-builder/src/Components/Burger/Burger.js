import React from 'react'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'
const burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(
       igkey =>{
         return [...Array(props.ingredients[igkey])].map((_, i)=>{
             return <BurgerIngredient key={igkey + i} type = {igkey}/>
         })
       } ).reduce((arr,cur)=>{
        return arr.concat(cur)
     },[])

       if(transformedIngredient.length === 0){
        transformedIngredient = <div>Please add Ingreadients</div>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}

export default burger;