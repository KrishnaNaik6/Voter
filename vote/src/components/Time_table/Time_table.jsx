import React, { useEffect } from "react";
import './index.css'
import fetcher from "../../model/fetcher";
import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";

const fetch = new fetcher

function Time_table() {
    const [student, setStudent] = useState([])
    const branch = localStorage.getItem('branch')
    const sem = localStorage.getItem('sem')
    const [Time_table, setTime_table] = useState([])

    useEffect(() => {
        // setStudent(localStorage.getItem('student'))
        fetch.get(`student/${localStorage.getItem('student')}`).then((e) => {
            console.log(e)
            setStudent(e)
        })
        fetch.get(`time-table/${sem}?branch=${branch}`).then((j) => {
            console.log("the res", j)
            setTime_table(j)
        })

    }, [])
    console.log("the time table set", Time_table)

    return (
        <div className="mainLayout_time">
            <div className="fixed_time">
                <div className="header_time">
                    <Header fname={student.fname} clg={student.college} />
                </div>
                <div className="navbar_time">
                    <Navbar />
                </div>
            </div>
            <div className="mainbody_time">
                <div>
                    <h2>Time Table</h2>
                    <p>Sem: {Time_table['sem']}</p>
                    <p>Branch: {Time_table['branch']}</p>
                </div>
                <div className="img_time">
                    <img src={`http://localhost:3000${Time_table['image']}`} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Time_table;