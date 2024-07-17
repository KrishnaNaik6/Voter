import React, { useEffect } from "react";
import './index.css'
import fetcher from "../../model/fetcher";
import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";

const fetch = new fetcher

function Home() {
    const voter_id = localStorage.getItem('voter_id')
    const district = localStorage.getItem('district')
    const [student, setStudent] = useState([])
    console.log(localStorage.getItem('voter_id'))


    useEffect(() => {

    }, [])

    return (
        <div className="mainLayout_home">
            <div className="fixed_std">
                <div className="header_home">
                    <Header fname={voter_id} clg={district} />
                </div>
                <div className="navbar_home">
                    <Navbar />
                </div>
            </div>
            <div className="mainbody">
                <h1>Voting Portal</h1>
                <div className="stu">
                    <p>Hello {student.fname}</p>
                    <p>This website is to help you with your Onlne Voting: {student.college}</p>
                </div>
                <div className="features">

                    <h3>Features:</h3>
                    <ol>
                        <li>View all candidates</li>
                        <li>Enable you vote through online</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Home;