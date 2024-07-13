import React, { useEffect } from "react";
import './index.css'
import fetcher from "../../model/fetcher";
import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";

const fetch = new fetcher

function Attendence() {
    const [student, setStudent] = useState([])
    const branch = localStorage.getItem('branch')
    const sem = localStorage.getItem('sem')
    const [subject, setSubject] = useState([])

    useEffect(() => {
        // setStudent(localStorage.getItem('student'))
        fetch.get(`student/${localStorage.getItem('student')}`).then((e) => {
            console.log(e)
            setStudent(e)
        }).then(() => {
            fetch.get('subjects').then((s) => {
                console.log("subjects are", s)
                setSubject(s)
            })
        })

    }, [])
    console.log(student)
    console.log("marks", student['marks'])
    console.log("attendence", student['attendence'])

    return (
        <div className="mainLayout_atd">
            <div className="fixed_atd">
                <div className="header_atd">
                    <Header fname={student.fname} clg={student.college} />
                </div>
                <div className="navbar_atd">
                    <Navbar />
                </div>
            </div>
            <div className="mainbody_atd">
                <div>
                    <h3>Your Attendence here {student.fname} {student.lname}</h3>
                    <table className="table_atd">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Subject</th>
                                <th>Attendence</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student['attendence']?.map((e, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{subject.map(s => (
                                            s.id == e.subject_id ? (s.name) : ("")
                                        ))}</td>
                                        <td>{e.attendence}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Attendence;