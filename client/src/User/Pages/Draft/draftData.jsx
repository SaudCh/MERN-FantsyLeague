import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FirstPrize, SecPrize, ThirdPrize } from "./Images";

export default function DraftData(props) {
  const { users, openModal } = props;

  return (
    <section>
      <div className="goalkeeper m-0 p-0">
        <table class="table m-0 p-0">
          <thead className="league-midfilders-table">
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ width: "40%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "25%" }}>
                Points
              </th>
              <th scope="col" style={{ width: "25%" }}>
                Team
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, ind) => {
              return (
                <tr>
                  <th scope="row">{ind + 1}</th>
                  <td>
                    <div className="d-flex align-items-center">
                      <h6 className="m-0 p-0">{user.name}</h6>{" "}
                      {ind === 0 ? (
                        <FirstPrize width="30" style={{ marginLeft: 10 }} />
                      ) : null}
                      {ind === 1 ? (
                        <SecPrize width="30" style={{ marginLeft: 10 }} />
                      ) : null}
                      {ind === 2 ? (
                        <ThirdPrize width="30" style={{ marginLeft: 10 }} />
                      ) : null}
                    </div>
                  </td>
                  <td>{user.points}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => openModal(user._id)}
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
