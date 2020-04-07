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
        <p>Current Price: {props.price}$</p>
        {loc.map( ctrl =>{
            return <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            add = {()=>{props.addIngredient (ctrl.type)}}
            remove = {()=>{props.removeIngredient(ctrl.type)}}
            disablebutton = {props.disable[ctrl.type]}
            />
        })}
        <button className={classes.OrderButton} disabled={!props.purchase} onClick={props.ordered}>ORDER NOW</button>

    </div>
)

export default BuildControls