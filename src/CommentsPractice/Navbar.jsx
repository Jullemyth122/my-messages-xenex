import React from 'react'
import { useLocation,Link } from 'react-router-dom'

function Navbar() {

    const location = useLocation()
    const take = location.state

    return (
        <div>
            <nav>
                <ul>
                    <div className="separate">
                        <li><Link to="/" > Home </Link> </li>
                        <li> {location.state ? take.name : "User"} </li>
                    </div>
          
                    <div className="separate">
                        <li><Link to='/user'> {location.state ? "Logout" : "Sign Up"}</Link></li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar