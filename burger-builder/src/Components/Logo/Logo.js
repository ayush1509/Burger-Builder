import React from 'react'

import classes from './Logo.css'

import burgerLogo from '../../Assets/Images/27.1 burger-logo.png.png'
const Logo = () =>(
    <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger"/>
    </div>
)

export default Logo