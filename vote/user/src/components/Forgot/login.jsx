import React from "react"
import { useEffect, useState } from "react"
import axios from "axios";
import '../Login/index.css'
import { Navigate, useNavigate } from "react-router-dom";


const apiEndpoint = "http://localhost:3000/voter";
const headers = {
    "Content-Type": "application/json",
};

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
})

function Forgot() {
    const navigate = useNavigate()

    const id_placehldr = 'Enter email Id'
    const pass_placehldr = 'Enter otp'
    const new_placehldr = 'Enter New Password'

    const handleClick = (id) => {
        const ch_id = id + 'chan'

        if (id == "newpass") {
            document.getElementById(id).innerHTML = `
        <label htmlFor =${ch_id}> ${new_placehldr}</label>
        <input type="text" id=${ch_id} placeholder= "" />
        `
        }else{

            document.getElementById(id).innerHTML = `
            <label htmlFor =${ch_id}>${id == 'id' ? (id_placehldr) : (pass_placehldr)}</label>
            <input type="text" id=${ch_id} placeholder= "" />
            `
            // document.getElementById(ch_id).focus();
        }

    }
    return (
        <div className="main">
            <div className="login">
                <h1>Forgot password</h1>
                <div className="credentials">
                    <label htmlFor=""></label>
                    <form id="idt" action="">
                        <div id="id">
                            <input type="text" onClick={() => { handleClick('id') }} placeholder={id_placehldr} />
                        </div>
                        <div id="newpass">
                            <input type="text" onClick={() => { handleClick('newpass') }} placeholder={new_placehldr} />
                        </div>
                        <div id="otp">
                            <input id="en_otp" type="text" onClick={() => { handleClick('otp') }} placeholder={pass_placehldr} />
                            <p className="forgot">
                                <a href="forgot">forgot password?</a>
                            </p>
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
                                const res = await axios.post("http://localhost:3000/send-otp", { gmail: idchan }, headers)
                                console.log("data", res.data)
                                localStorage.setItem("otp", res.data['otp'])

                                // navigate(`/dashboard/${res.data['college_code']}`)
                                alert("OTP sent successfull")
                                // navigate(`/home`)
                            } catch (error) {
                                console.log(error)
                            }
                        }}>
                            send otp
                        </button>
                        <button onClick={(e)=> {
                            e.preventDefault()
                            const gmail = document.getElementById('idchan').value
                            const newpassword = document.getElementById('newpasschan').value
                            const otp = localStorage.getItem('otp')
                            const entered_otp = document.getElementById('otpchan').value
                            if (otp === entered_otp){
                                console.log("otp matched")
                                try{
                                    const update = axios.put("http://localhost:3000/voter", {to_update:"password", update: newpassword, where:`gmail='${gmail}'`}, headers )
                                    alert("Password changed successfully")
                                    navigate('/login')
                                }catch(erro){
                                    alert(errro)
                                }
                                

                            }
                            console.log(otp, entered_otp)

                        }}>Confirm</button>
                        <p className="reg_link"><a href="login"> Login here</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Forgot