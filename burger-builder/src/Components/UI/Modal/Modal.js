import React from 'react'
import classes from './Modal.css'
import Aux from '../../../HOC/Aux';
import BackDrop from '../Backdrop/Backdrop';

const Modal = (props)=> {
    return (
        <Aux>
            <BackDrop show={props.show} canceled ={props.cancel}/>
            <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
                opacity: props.show ? '1':'0' 
            }}>
                {props.children}
            </div>
        </Aux>
    )
}

export default Modal;