import React from "react";
import './index.css'
import Header from "../Dashboard/Header";
import Navbar from "../Dashboard/Navbar";
import fetcher from "../../model/fetcher";
import { useEffect, useState } from "react";
import Connecter from "../../model/connecter";

const fetchdat = new fetcher

function Update_attendence() {
    const [student, setStudent] = useState();
    const [subject, setSubject] = useState();
    const [loading, setLoading] = useState(true);

    async function getdata(dt) {
        return await fetchdat.get(dt)
    }

    async function update() {
        try {
            const form_data = document.getElementById('atdupdate_form')
            let final_dt = {}
            let data = { to_update: "", update: {}, subject:"" }
            for (let i = 0; i < form_data.length; i++) {
                final_dt[form_data[i].id] = form_data[i].value
            }
            console.log(final_dt)
            data['to_update'] = final_dt['reg']
            data['update'][final_dt['to_update']] = final_dt['value']
            data['subject'] = final_dt['subject']

            Connecter.update('attendence', data).then((e) => {
                console.log(e)
            })
            console.log(data)
            window.location.reload()

        } catch (error) {
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
            setStudent(std_dt)
            getdata('subjects').then((j) => {
                // console.log("the subject", j)
                // let sub_dt = []
                // for (let i = 0; i < j.length; i++) {
                //     sub_dt.push(j[i])

                // }
                // console.log("the subject dt", sub_dt)
                setSubject(j)
            })
            setLoading(false);
        })
    }, [])

    return (
        <div className="mainLayout">
            <div className="header">
                <Header />
            </div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="update_atd">
                <h3>Students: {student?.length}</h3>
                <div className="details_update">
                    <form action="" id="atdupdate_form">
                        <div>
                            <label htmlFor="reg">Enter Register No:</label>
                            <input id="reg" type="text" />
                        </div>
                        <div>
                            <label htmlFor="to_update">Select to update: </label>
                            <select name="" id="to_update">
                                <option value="attendence">Attendence</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subject">Select Subject: </label>
                            <select name="" id="subject_id">
                                <option value="">Subject</option>
                                {
                                    subject?.map((e)=> (
                                        <option key={e.id} value={e.id}>{e.name}</option>
                                    ))
                                }
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

export default Update_attendence;