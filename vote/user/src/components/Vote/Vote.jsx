import React, { useEffect } from "react";
import './index.css'
import fetcher from "../../model/fetcher";
import { useState } from "react";
import Header from "../Header";
import Navbar from "../Navbar";
import axios from 'axios'

const fetch = new fetcher

const apiEndpoint = "http://localhost:3000";
const headers = {
    "Content-Type": "application/json",
};

const axiosInstance = axios.create({
    baseURL: apiEndpoint,
})

function Vote() {
    const [voted, setVoted] = useState(false)
    const [candidates, setCandidates] = useState([])
    const voter_id = localStorage.getItem('voter_id')
    const district = localStorage.getItem('district')
    const [Time_table, setTime_table] = useState([])

    useEffect(() => {
        // setStudent(localStorage.getItem('student'))
        fetch.get(`candidates`).then((e) => {
            console.log(e)
            const filtered = e?.filter(dist => dist[3] === district
                // console.log(dist[3], district)
            )
            console.log("the filtered e", filtered)
            setCandidates(filtered)
        })
        fetch.get('votes').then((e, i) => {
            console.log("the votes", e)
            e.map((j, i) => {
                if (j[0] == voter_id) {
                    console.log("already voted")
                    setVoted(true)
                }
            })

        })
        console.log("aftre fiter candidates are", candidates)
    }, [])

    return (
        <div className="mainLayout_time">
            <div className="fixed_time">
                <div className="header_time">
                    <Header fname={voter_id} clg={district} />
                </div>
                <div className="navbar_time">
                    <Navbar />
                </div>
            </div>
            <div className="mainbody_time">
                {voted ? (
                    <p>You've already Voted!!  Thank You..</p>
                )
                    :
                    (
                        <>
                            <div className="voting_board">
                                {
                                    <table className="table_mrk">
                                        <thead>
                                            <tr>
                                                <th>logo</th>
                                                <th>Candidate</th>
                                                <th>Party</th>
                                                <th>Click</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {

                                                candidates?.map((e, i) => (
                                                    <tr>
                                                        <td>
                                                            <div className="image">
                                                                <img src={"http://localhost:3000/" + e[2]} alt="" />
                                                            </div>
                                                        </td>
                                                        <td>{e[0]}</td>
                                                        <td>{e[1]}</td>
                                                        <td><button onClick={async () => {
                                                            console.log(voter_id, e[0])
                                                            const res = await axiosInstance.post("/votes", { voter_id: voter_id, candidate: e[0] }, headers)
                                                            console.log("data", res.data)
                                                            window.location.reload()

                                                            // vote_to(e[0])
                                                        }}></button></td>
                                                    </tr>
                                                ))

                                            }
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </>
                    )
                }
                {/* --------------------------------------- */}

            </div>
        </div>
    )
}

export default Vote;