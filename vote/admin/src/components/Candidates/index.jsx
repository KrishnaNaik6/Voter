import React from "react";
import "./index.css";
import Header from "../Dashboard/Header";
import Navbar from "../Dashboard/Navbar";
import fetcher from "../../model/fetcher";
import { useEffect, useState } from "react";
import Connecter from "../../model/connecter";
import axios from "axios";

const headers = {
  "Content-Type": "multipart/form-data",
};


const fetchdat = new fetcher();

function Candidates() {
  const [Candidates, SetCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState();

  const del = (name) => {
    try {
      // Connecter.delete(`candidates/${name}`).then((e) => {
      //   console.log("the result is", e);
      // });
      axios
      .delete(`http://localhost:3000/candidates/${name}`, { headers })
      .then((res) => {
        window.location.reload()

      })
      .catch((er) => console.log(er));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  async function add() {
    const form_data_t = document.getElementById("form_data_t");
    const formData = new FormData();
    let data = {};

    for (let i = 0; i < form_data_t.length - 1; i++) {
      console.log(form_data_t[i].file);
      data[form_data_t[i].id] = form_data_t[i].value;
    }
    console.log(data);
    formData.append("name", data["name"]);
    formData.append("party", data["party"]);
    formData.append("logo", file);
    formData.append("district", data['district']);
    axios
      .post("http://localhost:3000/candidates", formData, { headers })
      .then((res) => {
        window.location.reload()

      })
      .catch((er) => console.log(er));

    // Connecter.add('time-table',)
  }

  async function getdata(dt) {
    return await fetchdat.get(dt);
  }
  useEffect(() => {
    getdata("candidates").then((e) => {
      console.log(e.length);
      let std_dt = [];
      console.log(typeof std_dt);
      for (let i = 0; i < e.length; i++) {
        std_dt.push(e[i]);
      }
      console.log("the branch dt", std_dt);
      SetCandidates(e);
    });
    setLoading(false);
  }, []);

  return (
    <div className="mainLayout">
      <div className="header">
        <Header />
      </div>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="timetable">
        <div className="fixtm">
          <h2>Candidates</h2>
          <form id="form_data_t" action="">
            <div>
              <label htmlFor="name">Enter Candidate Name:</label>
              <input id="name" type="text" />
            </div>
            <div>
              <label htmlFor="party">Enter Party Name:</label>
              <input id="party" type="text" />
            </div>
            <div>
              <label htmlFor="logo">Upload time-table</label>
              <input
                id="logo"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <div>

              <label htmlFor="district">Enter District:</label>
              <input type="text" id="district" />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                add();
              }}
            >
              Add
            </button>
          </form>
        </div>
        <div className="timetables_t">
          {Candidates.map((e, i) => (
            <div className="timetable_single_t" key={e.id}>
              <div className="image_t">
                <img src={"http://localhost:3000/" + e[2]} alt="" />
              </div>
              <div className="content_t">
                <p key={i + 1}>Name: {e[0]}</p>
                <p key={i + 2}>Party: {e[1]}</p>
                <p key={i + 3}>District: {e[3]}</p>
                <button
                  onClick={(j) => {
                    j.preventDefault();
                    console.log(e.id);
                    del(e[0]);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Candidates;
