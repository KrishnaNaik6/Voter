import React, { useEffect } from "react";
import './index.css'
import fetcher from "../../model/fetcher";
import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";

const fetch = new fetcher

function Home() {
    const reg_no = localStorage.getItem('student')
    const [student, setStudent] = useState([])
    console.log(localStorage.getItem('student'))


    useEffect(() => {
        fetch.get(`student/${reg_no}`).then((e) => {
            console.log("the res", e)
            setStudent(e)
        })

    }, [])

    return (
        <div className="mainLayout_home">
            <div className="fixed_std">
                <div className="header_home">
                    <Header fname={student.fname} clg={student.college} />
                </div>
                <div className="navbar_home">
                    <Navbar />
                </div>
            </div>
            <div className="mainbody">
                <h1>Student Portal</h1>
                <div className="stu">
                    <p>Hello {student.fname}</p>
                    <p>This website is to help you with your college: {student.college}</p>
                </div>
                <div className="features">

                    <h3>Features:</h3>
                    <ol>
                        <li>View Latest college news</li>
                        <li>View your Attendence</li>
                        <li>View your subject marks</li>
                        <li>View Time-table</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default Home;