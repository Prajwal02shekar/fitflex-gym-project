import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="navbarContainer">
            <aside className="logo">
                <span className="logo-icon">⭐</span>
                <span className="logo-text">FitFlex</span>
            </aside>
            <aside className="menu">
                <NavLink to='/'>Home Page</NavLink>
                <NavLink to='/members'>Members</NavLink>
                <NavLink to='/payment'>Payment History</NavLink>
                <NavLink to='/personTraining'>PT Requests</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/register'>Register</NavLink>
            </aside>
        </nav>
    )
}

export default Navbar