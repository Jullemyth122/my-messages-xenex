import React from 'react'
import { Link } from 'react-router-dom'

function Navbar_component() {
  
    return (
        <div>   
            <nav>
                <ul>
                    <li><Link to="/"> Home  </Link></li>
                    <li><Link to="/create"> Create Habit</Link></li>
                </ul>
            </nav>
        </div>
  
    )
}

export default Navbar_component