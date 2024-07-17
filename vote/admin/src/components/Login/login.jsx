import '../Login/index.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const apiEndpoint = "http://localhost:3000/admin/";
const headers = {
    "Content-Type": "application/json",
};

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
})

function Login() {
    const navigate = useNavigate()

    const id_placehldr = 'Enter Your Name'
    const pass_placehldr = 'Enter Password'

    const handleClick = (id) => {
        const ch_id = id + 'chan'
        if (id == 'id') {
            document.getElementById(id).innerHTML = `
        <label htmlFor =${ch_id}>${id == 'id' ? (id_placehldr) : (pass_placehldr)}</label>
        <input type="text" id=${ch_id} placeholder= "" />
        `
        } else {
            document.getElementById(id).innerHTML = `
            <label htmlFor =${ch_id}>${id == 'id' ? (id_placehldr) : (pass_placehldr)}</label>
            <input type="password" id=${ch_id} />
            `
        }
    }


    return (
        <div className="main">
            <div className="login">
                <h1>Login</h1>
                <div className="credentials">
                    <label htmlFor=""></label>
                    <form id="login_form" className="login_form" action="">
                        <div id="id">
                            <input type="text" onClick={() => { handleClick('id') }} placeholder={id_placehldr} />
                        </div>
                        <div id="pass">
                            <input type="password" onClick={() => { handleClick('pass') }} placeholder={pass_placehldr} />
                        </div>
                        <p>Not registered? <a href="register"><b>register</b></a></p>
                        <button onClick={async (e) => {
                            e.preventDefault()
                            const form_data = document.getElementById('login_form')
                            let data = {}
                            for (let i = 0; i < form_data.length; i++) {
                                data[form_data[i].id] = form_data[i].value
                            }
                            console.log(data)
                            const { idchan, passchan } = data
                            try {
                                const res = await axiosInstance.post("login", { name: idchan, password: passchan }, headers)
                                console.log("data", res.data)
                                // navigate(`/dashboard/${res.data['college_code']}`)
                                navigate(`/dashboard`)
                            } catch (error) {
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