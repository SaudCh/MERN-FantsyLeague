import React, { useState, useEffect } from "react";
import InfoImg from "../../Components/Images/info-back.jpg";
import InfoImg2 from "../../Components/Images/info-2-back.jpg";
import { useChkUserAuth } from "../../Components/Hooks/chkAuth";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../Shared/Components/spinner";

function Info() {
  const history = useHistory();
  const { isUserLoggedIn, userId } = useChkUserAuth();
  const [loading, setLoading] = useState();
  const [team, setTeam] = useState("");

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

        console.log(responseData.data);
        setTeam(responseData.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        console.log(err.message);
      }
    };

    fetchTeam();
  }, [userId, setLoading]);

  const navigation = (path) => {
    isUserLoggedIn ? history.push(path) : history.push("/login");
  };
  return (
    <section className="container-fluid">
      {loading && <LoadingSpinner asOverlay />}

      <div className="container-fluid">
        <div className="row align-items-center justify-content-center">
          {team.striker1 ? (
            <div className="col-6 col-md-2 mt-4">
              <div>
                <img
                  src={`http://localhost:5000/${team.striker1.image}`}
                  style={{
                    height: "100px",
                    // width: "300px",
                    alignSelf: "center",
                  }}
                  class="card-img-top"
                  alt="..."
                />
                <p className="p-0 m-0">{team.striker1.name}</p>
                <p className="p-0 m-0">Striker</p>
              </div>
            </div>
          ) : null}

          {team.goalkeeper ? (
            <div className="col-6 col-md-2 mt-4">
              <div>
                <img
                  src={`http://localhost:5000/${team.goalkeeper.image}`}
                  style={{
                    height: "100px",
                    // width: "300px",
                    alignSelf: "center",
                  }}
                  class="card-img-top"
                  alt="..."
                />
                <p className="p-0 m-0">{team.goalkeeper.name}</p>
                <p className="p-0 m-0">Goal Keeper</p>
              </div>
            </div>
          ) : null}

          {team.midfilder ? (
            <div className="col-6 col-md-2 mt-4">
              <div>
                <img
                  src={`http://localhost:5000/${team.midfilder.image}`}
                  style={{
                    height: "100px",
                    // width: "300px",
                    alignSelf: "center",
                  }}
                  class="card-img-top"
                  alt="..."
                />
                <p className="p-0 m-0">{team.midfilder.name}</p>
                <p className="p-0 m-0">Mid Fielder</p>
              </div>
            </div>
          ) : null}

          {team.defender ? (
            <div className="col-6 col-md-2 mt-4">
              <div>
                <img
                  src={`http://localhost:5000/${team.defender.image}`}
                  style={{
                    height: "100px",
                    // maxWidth: "300px",
                    alignSelf: "center",
                  }}
                  class="card-img-top"
                  alt="..."
                />
                <p className="p-0 m-0">{team.defender.name}</p>
                <p className="p-0 m-0">Defender</p>
              </div>
            </div>
          ) : null}

          {team.striker2 ? (
            <div className="col-6 col-md-2 mt-4">
              <div>
                <img
                  src={`http://localhost:5000/${team.striker2.image}`}
                  style={{
                    height: "100px",
                    // maxWidth: "300px",
                    alignSelf: "center",
                  }}
                  class="card-img-top"
                  alt="..."
                />
                <p className="p-0 m-0">{team.striker2.name}</p>
                <p className="p-0 m-0">Striker</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="row align-items-center mt-5">
        <div className="col-12 col-md-6 text-center d-flex align-ietms-center justify-content-center mt-4 mt-md-0">
          <div className="col-4 align-self-center">
            <h4>Create Your Leagues</h4>
            <p>
              Play against friends and family, colleagues or a web community in
              invitational leagues and cups.
            </p>
            <button
              onClick={() => navigation("/league")}
              className="btn btn-sm btn-primary"
            >
              Create Your League
            </button>
          </div>
        </div>
        <div className="col-12 col-md-6 d-flex align-ietms-center justify-content-center">
          <img src={InfoImg} style={{ width: "80%" }} alt="" />
        </div>
      </div>

      <div className="row align-items-center mt-5 pb-5">
        <div className="col-12 col-md-6 d-flex align-ietms-center justify-content-center">
          <img src={InfoImg2} style={{ width: "80%" }} alt="" />
        </div>
        <div className="col-12 col-md-6 text-center d-flex align-ietms-center justify-content-center mt-4 mt-md-0">
          <div className="col-4 align-self-center">
            <h4>Pick Your Squad</h4>
            <p>Pick a squad of 5 players from the Premier League.</p>
            <button
              onClick={() => navigation("/team")}
              className="btn btn-sm btn-primary"
            >
              Create Your Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;
