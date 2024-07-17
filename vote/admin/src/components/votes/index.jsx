import React from "react";
import './index.css'
import Header from "../Dashboard/Header";
import Navbar from "../Dashboard/Navbar";
import fetcher from "../../model/fetcher";
import { useEffect, useState } from "react";
import Connecter from "../../model/connecter";
import axios from "axios";

const fetchdat = new fetcher

function Votes() {
    const [votes, setVotes] = useState({});
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    
    async function getdata(dt) {
        return await fetchdat.get(dt)
    }
    
    useEffect(() => {
        getdata('candidates').then((e) => {
            console.log("candidates are", e)
            setCandidates(e)
            let c_vote = {}
            e.map(async (j)=>{
                console.log("single candidate", j)
                await getdata(`votes/${j[0]}`).then((k)=>{
                    c_vote[j[0]]=k.length
                    setVotes(c_vote)
                })
            })
        }).then(
            setLoading(false)
        )
        
    }, [])

    return (
        <div className="mainLayout">
            <div className="header">
                <Header />
            </div>
            <div className="navbar">
                <Navbar />
            </div>
            <div className="marks">
                <div className="mark">
                    {
                        loading? <p>Loading...</p> :
                        candidates.map((e, i) => (
                            <div className="marks_single" key={e.id}>
                                <div className="content">
                                    <p key={i + 1}>candidate: {e[0]}</p>
                                    <p key={i + 2}>Party: {e[1]}</p>
                                    <p key={i + 3}>Votes: {votes[e[0]] ?  votes[e[0]] : 0}</p>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Votes;