import React from 'react'
import {Link} from 'react-router-dom'
function NavbarSample() {
  
    return (
    <div>

        <nav>
            <ul>
                <li> <Link to='/'> Home </Link> </li>
                <li> <Link to='/create'> Create </Link></li>
            </ul>
        </nav>

    </div>
  )
}

export default NavbarSample