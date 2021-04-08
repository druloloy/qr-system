import React from 'react'
import { Link } from 'react-router-dom';

function Navbar({path, title}) {
    return (
        <div className="navbar"> 
            <Link to={path}>{title}</Link>
        </div>
    )
} 
 
export default Navbar
