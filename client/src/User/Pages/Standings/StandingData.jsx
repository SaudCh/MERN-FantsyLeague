import React from "react";

export default function StandingData(props) {
  const { squad } = props;

  return (
    <section>
      <div className="goalkeeper m-0 p-0">
        <table class="table m-0 p-0">
          <thead className="league-midfilders-table">
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ width: "16%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "16%" }}>
                Game Played
              </th>
              <th scope="col" style={{ width: "16%" }}>
                Wins
              </th>
              <th scope="col" style={{ width: "16%" }}>
                Losses
              </th>
              <th scope="col" style={{ width: "16%" }}>
                Draw
              </th>
              <th scope="col" style={{ width: "16%" }}>
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {squad.map((user, ind) => {
              return (
                <tr>
                  <th scope="row">{ind + 1}</th>
                  <td>
                    <h6 className="m-0 p-0">{user.name}</h6>{" "}
                  </td>
                  <td>{user.points}</td>
                  <td>{user.wins}</td>
                  <td>{user.losses}</td>
                  <td>{user.draws}</td>
                  <td>{user.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
