import React from 'react'
import classes from './Backdrop.css'

const BackDrop = (props) => (
    props.show ? <div className={classes.BackDrop} onClick={props.canceled}></div> :null 
)
    

export default BackDrop