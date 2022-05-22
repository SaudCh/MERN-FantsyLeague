import React from "react";
import Header from "../../Components/Header/Header";
import LeagueImg from "../../Components/Images/league.png";

export default function FAQ() {
  return (
    <div>
      <Header />
      <section className="row fansty-container m-0 p-0">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <h1 className="fansty-heading">FAQ</h1>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img src={LeagueImg} className="league-image" alt="" />
        </div>
      </section>

      
    </div>
  );
}
