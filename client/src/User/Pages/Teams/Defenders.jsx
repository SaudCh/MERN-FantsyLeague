import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddPlayer from "./AddPlayer";
import { toast } from "react-toastify";
import PlayerInfo from "./PlayerInfo";

function Defenders(props) {
  const { team, fetchTeam, setLoading } = props;

  const [modal, setModal] = useState(false);
  const [playerMoal, setPlayerModal] = useState(false);

  function openPlayerModel() {
    setPlayerModal(true);
  }

  function closePlayerModal() {
    setModal(false);
    setPlayerModal();
  }

  function openAddModel() {
    setModal(true);
  }

  function closeAddModal() {
    setModal(false);
    fetchTeam();
  }

  const deletePlayer = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}team/deletePlayer/${id}/def`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }
      //console.log(responseData);

      setLoading(false);

      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      fetchTeam();
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";
      toast.success(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <section>
      <div className="goalkeeper m-0 p-0">
        <table class="table m-0 p-0">
          <thead className="league-defenders-table">
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ width: "50%" }}>
                Defenders
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Team
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Points
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {team.defender ? (
              <tr>
                <th scope="row">1</th>
                <td>
                  <h6 className="m-0 p-0">{team.defender.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    DF
                  </p>
                </td>
                <td>{team.defender.team}</td>
                <td>{team.defender.points}</td>

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openPlayerModel()}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => deletePlayer(team._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td></td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openAddModel()}
                  >
                    Add Defender
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddPlayer
        modalIsOpen={modal}
        closeModal={closeAddModal}
        team={team}
        cat="def"
      />
      {team.defender ? (
        <PlayerInfo
          modalIsOpen={playerMoal}
          closeModal={closePlayerModal}
          player={team.defender}
        />
      ) : null}
    </section>
  );
}

export default Defenders;
