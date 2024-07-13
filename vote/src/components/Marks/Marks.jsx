import React, { useEffect } from "react";
import './index.css'
import fetcher from "../../model/fetcher";
import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";

const fetch = new fetcher

function Marks() {
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
        <div className="mainLayout_mrk">
            <div className="fixed_mrk">
                <div className="header_mrk">
                    <Header fname={student.fname} clg={student.college} />
                </div>
                <div className="navbar_mrk">
                    <Navbar />
                </div>
            </div>
            <div className="mainbody_mrk">
                <div>
                    <h3>Your Marks here {student.fname} {student.lname}</h3>
                    <table className="table_mrk">
                        <thead>
                            <tr>
                                <th>Sl.No</th>
                                <th>Subject</th>
                                <th>Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student['marks']?.map((e, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{subject.map(s => (
                                            s.id == e.subject_id ? (s.name) : ("")
                                        ))}</td>
                                        <td>{e.marks}</td>
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

export default Marks;