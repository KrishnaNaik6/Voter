import Header from "./Header";
import Navbar from "./Navbar";
import './index.css'
import { useEffect, useState } from "react";
import fetcher from "../../model/fetcher";

const fetchdat = new fetcher

function Dashboard() {
    const [voter_no, setvoterNo] = useState();
    const [candidates, setcandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getdata(dt) {
        return await fetchdat.get(dt)
    }

    useEffect(() => {
        getdata('candidates').then((e) => {
            console.log(e.length)
            let candidates_dt = []
            console.log(typeof candidates_dt)
            for (let i = 0; i < e.length; i++) {
                candidates_dt.push(e[i])
            }
            console.log("the candidates dt", candidates_dt)
            setcandidates(candidates_dt)
        })

        getdata('voter').then((e) => {
            console.log(e.length)
            let std_dt = []
            console.log(typeof std_dt)
            for (let i = 0; i < e.length; i++) {
                std_dt.push(e[i])

            }
            console.log("the candidates dt", std_dt)
            setvoterNo(std_dt.length)
        })
        setLoading(false)

    }, [])


    return (
        <div className="mainLayout">
            <div className="header">
                <Header />
            </div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="dashboard">
                {loading ? (
                    <p>Loading....</p>
                )
                    :
                    (
                        <>
                            <div className="student_no">
                                <h3>Number Of Voters</h3>
                                <p>{voter_no}</p>

                            </div>
                            <div className="candidateses">
                                <h3>Candidateses: {candidates.length}</h3>
                                <ol>
                                {
                                    candidates.map((e, i) => (
                                        <li key={i}>
                                            Name : {e[0]} | &nbsp;
                                            Party : {e[1]}
                                        </li>

                                    ))
                                }
                                </ol>


                            </div>
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;