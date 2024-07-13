import React from "react"
import { useEffect, useState } from "react"
import axios from "axios";
import '../Login/index.css'
import { Navigate, useNavigate } from "react-router-dom";


const apiEndpoint = "http://localhost:3000/student/";
const headers = {
    "Content-Type": "application/json",
};

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
})

function Login() {
    const navigate = useNavigate()
    const [cur_id, setCur_id] = useState('')

    const id_placehldr = 'Enter student id'
    const pass_placehldr = 'Enter Password'

    const handleClick = (id) => {
        const ch_id = id + 'chan'
        document.getElementById(id).innerHTML = `
        <label htmlFor =${ch_id}>${id == 'id' ? (id_placehldr) : (pass_placehldr)}</label>
        <input type="text" id=${ch_id} placeholder= "" />
        `
        // document.getElementById(ch_id).focus();
    }
    return (
        <div className="main">
            <div className="login">
                <h1>Login</h1>
                <div className="credentials">
                    <label htmlFor=""></label>
                    <form id="idt" action="">
                        <div id="id">
                            <input type="text" onClick={() => { handleClick('id') }} placeholder={id_placehldr} />
                        </div>
                        <div id="pass">
                            <input type="text" onClick={() => { handleClick('pass') }} placeholder={pass_placehldr} />
                        </div>
                        <button onClick={async (e) => {
                            e.preventDefault()
                            const form_data = document.getElementById('idt')
                            let data = {}
                            for (let i = 0; i < form_data.length; i++) {
                                data[form_data[i].id] = form_data[i].value
                            }
                            console.log(data)
                            const { idchan, passchan } = data
                            try {
                                const res = await axiosInstance.post("login", { id: idchan, password: passchan }, headers)
                                console.log("data", res.data)
                                localStorage.setItem('student', res.data.reg_no)
                                localStorage.setItem('branch', res.data.branch)
                                localStorage.setItem('sem', res.data.sem)

                                // navigate(`/dashboard/${res.data['college_code']}`)
                                alert("login successfull")
                                navigate(`home`)
                            } catch (error) {
                                console.log(error)
                                alert("unauthorized")
                            }
                        }}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login