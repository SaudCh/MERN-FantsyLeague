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

      <section className="p-5">
        <>
          <h4 className="about-heading">Selecting your Initial Squad</h4>
          <h6 className="about-subheading">Squad Size</h6>
          <p className="about-paragraph">
            To join the game select a fantasy football squad of 5 players,
            consisting of:
            <ul className="about-list">
              <li>1 Goalkeepers</li>
              <li>1 Defenders</li>
              <li>1 Midfielders</li>
              <li>2 Forwards</li>
            </ul>
            <h6>Budget</h6>
            The total value of your initial squad must not exceed £100 million.
            <h6>Players Per Team</h6>
            You can select up to 3 players from a single Premier League team.
          </p>
        </>

        <>
          <h4 className="about-heading">Managing your squad</h4>
          <h6 className="about-subheading">Choosing Your Starting 11</h6>
          <p className="about-paragraph">
            From your 15 player squad, select 11 players by the Gameweek
            deadline to form your team.
          </p>
          <p className="about-paragraph">
            All your points for the Gameweek will be scored by these 11 players,
            however if one or more doesn't play they may be automatically
            substituted.
          </p>
          <p className="about-paragraph">
            Your team can play in any formation providing that 1 goalkeeper, at
            least 3 defenders and at least 1 forward are selected at all times.
          </p>

          <h6 className="about-subheading">
            Selecting a Captain and a Vice-Captain
          </h6>
          <p className="about-paragraph">
            From your starting 11 you nominate a captain and a vice-captain.
            Your captain's score will be doubled.
          </p>
          <p className="about-paragraph">
            If your captain plays 0 minutes in the Gameweek, the captain will be
            changed to the vice-captain.
          </p>
          <p className="about-paragraph">
            If both captain and vice-captain play 0 minutes in a Gameweek, then
            no player's score will be doubled.
          </p>
          <h6 className="about-subheading">
            Prioritising Your Bench For Automatic Substitutions
          </h6>
          <p className="about-paragraph">
            Your substitutes provide cover for unforeseen events like injuries
            and postponements by automatically replacing starting players who
            don't play in a Gameweek.
          </p>
          <p className="about-paragraph">
            Playing in a Gameweek means playing at least 1 minute or receiving a
            yellow / red card.
          </p>
          <p className="about-paragraph">
            Based on the priorities you assign, automatic substitutions are
            processed at the end of the Gameweek as follows:
            <ul className="about-list">
              <li>
                If your Goalkeeper doesn't play in the Gameweek, he will be
                substituted by your replacement Goalkeeper, if he played in the
                Gameweek.
              </li>
              <li>
                If any of your outfield players don't play in the Gameweek, they
                will be substituted by the highest priority outfield substitute
                who played in the Gameweek and doesn't break the formation rules
                (eg. If your starting team has 3 defenders, a defender can only
                be replaced by another defender).
              </li>
            </ul>
          </p>
        </>
      </section>
    </div>
  );
}
