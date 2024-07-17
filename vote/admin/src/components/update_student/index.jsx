import React from "react";
import './index.css'
import Header from "../Dashboard/Header";
import Navbar from "../Dashboard/Navbar";
import fetcher from "../../model/fetcher";
import { useEffect, useState } from "react";
import Connecter from "../../model/connecter";

const fetchdat = new fetcher

function Update_student() {
    const [student, setStudent] = useState();
    const [studentNo, setStudentNo] = useState();
    const [loading, setLoading] = useState(true);

    async function getdata(dt) {
        return await fetchdat.get(dt)
    }

    async function 
    update() {
        try {
            const form_data = document.getElementById('stdupdate_form')
            let final_dt = {}
            let data = { to_update: "", update: {} }
            for (let i = 0; i < form_data?.length; i++) {
                final_dt[form_data[i].id] = form_data[i].value
            }
            console.log(final_dt)
            data['to_update'] = final_dt['reg']
            data['update'][final_dt['to_update']] = final_dt['value']

            Connecter.update('student', data).then((e) => {
                console.log(e)
            })
            console.log(data)
            window.location.reload()
            
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => {
        getdata('student').then((e) => {
            console.log(e.length)
            let std_dt = []
            // console.log(typeof std_dt)
            for (let i = 0; i < e.length; i++) {
                std_dt.push(e[i])

            }
            console.log("the branch dt", std_dt)
            setStudentNo(std_dt.length)
            setStudent(std_dt)
        })
        setLoading(false);
    }, [])

    return (
        <div className="mainLayout">
            <div className="header">
                <Header />
            </div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="update_std">
                <h3>Students: {student?.length}</h3>
                <div className="details_update">
                    <form action="" id="stdupdate_form">
                        <div>
                            <label htmlFor="reg">Enter Register No:</label>
                            <input id="reg" type="text" />
                        </div>
                        <div>
                            <label htmlFor="to_update">Select to update: </label>
                            <select name="" id="to_update">
                                <option value="reg_no">Register No</option>
                                <option value="fname">First Name</option>
                                <option value="mname">Middle Name</option>
                                <option value="lname">Last Name</option>
                                <option value="address">Address</option>
                                <option value="branch">Branch</option>
                                <option value="sem">Sem</option>
                                <option value="phone">Phone</option>
                            </select>
                        </div>
                        <div>

                            <label htmlFor="value">Enter value to update: </label>
                            <input id="value" type="text" />
                        </div>
                    </form>
                    <button onClick={(e) => {
                        e.preventDefault()
                        update()
                    }}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default Update_student;