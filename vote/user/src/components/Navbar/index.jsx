import React from "react";
import './index.css'

const Navbar = () =>{
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li><a href="home">Home</a></li>
                    <li><a href="vote">Vote</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;