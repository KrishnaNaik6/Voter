import React from "react"
import './index.css'

const Header = ({ fname, clg }) => {
    return (
        <div className="head">
            <header>
                <div className="college">
                    <h2>{clg}</h2>
                </div>
                <div className="std_name">
                    <h1>Hello {fname}, Welcome to Student Page </h1>
                </div>
            </header>
        </div>
    )
}

export default Header;