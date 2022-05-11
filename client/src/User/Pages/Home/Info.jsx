import React from "react";
import InfoImg from "../../Components/Images/info-back.jpg";
import InfoImg2 from "../../Components/Images/info-2-back.jpg";
import { useChkUserAuth } from "../../Components/Hooks/chkAuth";
import { useHistory } from "react-router-dom";

function Info() {
  const history = useHistory();
  const { isUserLoggedIn } = useChkUserAuth();

  const navigation = (path) => {
    isUserLoggedIn ? history.push(path) : history.push("/login");
  };
  return (
    <section className="container-fluid">
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

      <div className="row align-items-center mt-5">
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
