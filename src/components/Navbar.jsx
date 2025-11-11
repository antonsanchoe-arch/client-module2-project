import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/characters">characters</Link></li>
                <li><Link to="/favorites">⭐</Link></li>
                <li><Link to="/search">search</Link></li>
                <li><Link to="/about">About Us</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar