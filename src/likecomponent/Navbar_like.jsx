import React from 'react'
import { Link } from 'react-router-dom'

function Navbar_like() {
  
    return (
  
        <div>
            <nav>
                <ul>
                    <li><Link to="/"> Home Starter </Link></li>
                    <li><Link to="/create"> Create Starter </Link></li>
                </ul>
            </nav>
        </div>
  
    )
}

export default Navbar_like