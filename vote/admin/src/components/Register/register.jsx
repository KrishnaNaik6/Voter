import '../Register/index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const apiEndpoint = "http://localhost:3000/";
const headers = {
    "Content-Type": "application/json",
};

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
})

function Register() {
    const navigate = useNavigate()

    return (
        <div className="main">
            <div className="Register">
                <h1>Register</h1>
                <div className="credentials">
                    <label htmlFor=""></label>
                    <form id="Register_form" className="Register_form" action="">
                        <label htmlFor="id">Enter Name:</label>
                        <input id='name' type="text" />
                        <label htmlFor="emial">Enter Email:</label>
                        <input id="email" type="gmail" />
                        <label htmlFor="phone">Enter Phone Number:</label>
                        <input id="phone" type="number" />
                        <label htmlFor="password">Enter Password:</label>
                        <input id="password" type="password" />
                        <p>Registered? <a href="login"><b>Login</b></a></p>
                        <button onClick={async (e) => {
                            e.preventDefault()
                            const form_data = document.getElementById('Register_form')
                            let data = {}
                            for (let i = 0; i < form_data.length; i++) {
                                data[form_data[i].id] = form_data[i].value
                            }
                            console.log(data)
                            const { name, email, phone, password} = data
                            try {
                                const res = await axiosInstance.post("admin", { name: name, email:email,  phone: phone, password:password }, headers)
                                console.log("data", res.data)
                                alert("registration successfull")
                                navigate("/login")
                            } catch (error) {
                                alert(error)
                            }
                            console.log(name, clg, password, phone, email)

                        }}>
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register