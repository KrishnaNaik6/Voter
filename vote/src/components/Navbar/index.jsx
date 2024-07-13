import React from "react";
import './index.css'

const Navbar = () =>{
    return (
        <div className="navbar">
            <nav>
                <ul>
                    
                    <li><a href="home">Home</a></li>
                    <li><a href="time-table">Time-table</a></li>
                    <li><a href="attendence">Attendence</a></li>
                    <li><a href="marks">Marks</a></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;