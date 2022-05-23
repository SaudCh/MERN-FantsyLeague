import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import "../../Components/Css/user-team.css";
import TeamImg from "../../Components/Images/team.png";
import GoalKeeper from "./GoalKeeper";
import Defenders from "./Defenders";
import MidFilders from "./MidFilders";
import Strikers from "./Strikers";
import { useChkUserAuth } from "../../Components/Hooks/chkAuth";
import LoadingSpinner from "../../../Shared/Components/spinner";

//gets user id from custom chkuserAuth and from that id fetch user detail from backend
//pass the data to striker,goal keeper,mid filder,defenders
function Team() {
  const [loading, setLoading] = useState(false);
  const [team, setTeam] = useState("");

  const { userId } = useChkUserAuth();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}team/byuser/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        //console.log(responseData.data);
        setTeam(responseData.data);
        // console.log(responseData.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        console.log(err.message);
      }
    };

    fetchTeam();
  }, [userId]);

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}team/byuser/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setTeam(responseData.data ? responseData.data : "");

      setLoading(false);
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";
      console.log(err.message);
    }
  };

  return (
    <div className="bg-light">
      {loading && <LoadingSpinner asOverlay />}
      <Header />

      <section className="row fansty-container m-0 p-0">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img src={TeamImg} className="league-image" alt="" />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <h1 className="fansty-heading">Team Selection</h1>
        </div>
      </section>

      <section className="container-fluid mt-5 px-3 pb-5">
        <h4 className="fw-bold">Squad Sectional</h4>
        <hr />
        <p>Select a maximum of 5 players from all available players</p>

        <GoalKeeper team={team} fetchTeam={fetchTeam} setLoading={setLoading} />
        <Defenders team={team} fetchTeam={fetchTeam} setLoading={setLoading} />
        <MidFilders team={team} fetchTeam={fetchTeam} setLoading={setLoading} />
        <Strikers team={team} fetchTeam={fetchTeam} setLoading={setLoading} />
      </section>
    </div>
  );
}

export default Team;
