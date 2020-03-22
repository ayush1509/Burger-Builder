import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const loc = [
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Salad',
        type: 'salad'
    }
]
const BuildControls = (props)=>(
    <div className={classes.BuildControls}>
        {console.log(props.price)}
        <p>Current Price:{props.price}</p>
        {loc.map( ctrl =>{
            return <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            add = {()=>{props.addIngredient(ctrl.type)}}
            remove = {()=>{props.removeIngredient(ctrl.type)}}
            disablebutton = {props.disable[ctrl.type]}
            />
        })}

    </div>
)

export default BuildControls