import React, { useState } from 'react'
import { connect } from 'react-redux'

import Aux from '../../HOC/Aux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerClosedHandler = ()=> {
        setSideDrawerIsVisible(false)
    }

    const changeState = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }
    
    return (
        <Aux>
            <Toolbar isAuthenticated = {props.isAuthenticated} drawerToggleClicked= {changeState}/>
            <SideDrawer isAuthenticated = {props.isAuthenticated} open={sideDrawerIsVisible} closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}


const mapStateToProps = state => {
    return {
    isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)