import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../../Shared/Components/spinner";
import Header from "../../Components/Header/Header";
import { useChkUserAuth } from "../../Components/Hooks/chkAuth";
import LeagueImg from "../../Components/Images/league.png";
import "../../../index.css";
import CreateLeague from "./createLeague";
import JoinLeague from "./joinLeague";

//fetch leagues from database in function fetch leagues
//and pass it to createLeague.jsx and joinLeague.jsx
export default function Leagues() {
  const [loading, setLoading] = useState(false);
  const { userId } = useChkUserAuth();
  const [user, setUser] = useState([]);

  const fetchLeague = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}user/byid/${userId}`,
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

      setUser(responseData.user);

      setLoading(false);
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";
      console.log(err.message);
    }
  };

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}user/byid/${userId}`,
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

        setUser(responseData.user);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        console.log(err.message);
      }
    };

    fetchLeague();
  }, [userId]);

  return (
    <div>
      {loading && <LoadingSpinner asOverlay />}
      <Header />
      <section className="row fansty-container m-0 p-0">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img src={LeagueImg} className="league-image" alt="" />
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <h1 className="fansty-heading">Private Leagues</h1>
        </div>
      </section>

      <CreateLeague
        league={user.league}
        fetchLeague={fetchLeague}
        userId={userId}
        setLoading={setLoading}
      />

      <JoinLeague
        league={user.fLeagues}
        fetchLeague={fetchLeague}
        userId={userId}
        setLoading={setLoading}
      />
    </div>
  );
}
