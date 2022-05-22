import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../Shared/Components/spinner";
import Header from "../../Components/Header/Header";
import DraftImg from "../../Components/Images/draft.png";
import StandingData from "./StandingData";
export default function Standing() {
  const [loading, setLoading] = useState(false);
  const [squad, setSquads] = useState([]);

  useEffect(() => {
    const fetchSquad = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}squad/viewall`,
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

        setSquads(responseData.squad);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        //console.log(err.message);
        //setErrors(errs)
      }
    };

    fetchSquad();
  }, []);

  return (
    <div>
      {loading && <LoadingSpinner asOverlay />}
      <Header />
      <section className="row fansty-container m-0 p-0">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <h1 className="fansty-heading">Standings</h1>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img src={DraftImg} className="league-image" alt="" />
        </div>
      </section>

      <section className="container-fluid mt-5 px-3 pb-5">
        <h4 className="fw-bold">Standing</h4>
        <hr />
        <p>
          Take your turn to pick from the pool and build a 5-man squad unique to
          you.
        </p>

        <StandingData squad={squad} setLoading={setLoading} />
      </section>
    </div>
  );
}
