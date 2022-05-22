import React from "react";
import Header from "../../Components/Header/Header";
import DraftImg from "../../Components/Images/draft.png";
import "../../Components/Css/user-about.css";

export default function About() {
  return (
    <div>
      <Header />
      
      <section className="row fansty-container m-0 p-0">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <h1 className="fansty-heading">About Us</h1>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img src={DraftImg} className="league-image" alt="" />
        </div>
      </section>

      <section className="container-fluid p-5">
        <h4 className="about-heading">
          Find out more about how the Fantasy League is organised
        </h4>
        <h6 className="about-subheading">
          The Fantasy League is the organising body of the Fantasy League with
          responsibility for the competition, its Rule Book and the centralised
          broadcast and other commercial rights.
        </h6>
        <p className="about-paragraph">
          However, we do not operate in isolation. We work proactively and
          constructively with our Member Clubs and the other football
          authorities to improve the quality of football, both in England and
          across the world.
        </p>

        <h4 className="about-heading">
          The Member Clubs of the Fantasy League
        </h4>

        <p className="about-paragraph">
          The Fantasy League is a private company wholly owned by its 20 Member
          Clubs who make up the League at any one time.
        </p>
        <p className="about-paragraph">
          Each individual club is independent, working within the rules of
          football, as defined by the Fantasy League, The FA, UEFA and FIFA, as
          well as being subject to English and European law.
        </p>
        <p className="about-paragraph">
          Each of the 20 clubs are a Shareholder in the Fantasy League.
          Consultation is at the heart of the Fantasy League and Shareholder
          meetings are the ultimate decision-making forum for Fantasy League
          policy and are held at regular intervals during the course of the
          season.
        </p>
        <p className="about-paragraph">
          The Fantasy League AGM takes place at the close of each season, at
          which time the relegated clubs transfer their shares to the clubs
          promoted into the Fantasy League from the Football League
          Championship.
        </p>
        <p className="about-paragraph">
          Clubs have the opportunity to propose new rules or amendments at the
          Shareholder meeting. Each Member Club is entitled to one vote and all
          rule changes and major commercial contracts require the support of at
          least a two-thirds vote, or 14 clubs, to be agreed.
        </p>
        <p className="about-paragraph">
          The Fantasy League Rule Book, contained within the Handbook (Download:
          Fantasy League Handbook; PDF 21.6MB), serves as a contract between the
          League, the Member Clubs and one another, defining the structure and
          running of the competition.
        </p>
        <p className="about-paragraph">
          Any serious breach of the Rule Book results in an independent
          three-person tribunal sitting to hear the case, ascertain guilt and
          set the punishment, which can range from fines to points deductions
          and, in extreme cases, expulsion from the competition (this has never
          happened in the history of the Fantasy League).
        </p>

        <h4 className="about-heading">Fantasy League UK workforce</h4>
        <p className="about-paragraph">
          The Fantasy League head office is based in central London. The
          organisation has a staff of 191 people who deliver across a range of
          roles including football, coach development, community, youth
          development, safeguarding, broadcast, commercial, communications,
          digital, finance, legal, marketing and policy.
        </p>
        <p className="about-paragraph">
          The Fantasy League’s current UK workforce includes 16.2 per cent
          Black, Asian, minority ethnic representation and we are committed to
          delivering equality, diversity and inclusion across the organisation.
          We are currently in the process of achieving the EY National Equality
          Standard and therefore our activities and polices are independently
          assessed.
        </p>
      </section>
    </div>
  );
}
