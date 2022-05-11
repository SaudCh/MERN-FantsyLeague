import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import AddPlayer from "./AddPlayer";
import { toast } from "react-toastify";
import PlayerInfo from "./PlayerInfo";

function Strikers(props) {
  const { team, fetchTeam, setLoading } = props;

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [playerMoal, setPlayerModal] = useState(false);
  const [playerMoal2, setPlayerModal2] = useState(false);

  function openPlayerModel() {
    setPlayerModal(true);
  }

  function closePlayerModal() {
    setModal(false);
    setPlayerModal();
  }

  function openPlayerModel2() {
    setPlayerModal2(true);
  }

  function closePlayerModal2() {
    setPlayerModal2(false);
  }

  function openAddModel() {
    setModal(true);
  }

  function closeAddModal() {
    setModal(false);
    fetchTeam();
  }
  function openAddModel2() {
    setModal2(true);
  }

  function closeAddModal2() {
    setModal2(false);
    fetchTeam();
  }

  const deletePlayer = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}team/deletePlayer/${id}/st1`,
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

  const deletePlayer2 = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}team/deletePlayer/${id}/st2`,
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
          <thead className="league-striker-table">
            <tr>
              <th scope="col">#</th>
              <th scope="col" style={{ width: "50%" }}>
                Strikers
              </th>
              <th scope="col" style={{ width: "15%" }}>Team</th>
              <th scope="col" style={{ width: "15%" }}>Points</th>
              <th scope="col" style={{ width: "15%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {team.striker1 ? (
              <tr>
                <th scope="row">1</th>
                <td>
                  <h6 className="m-0 p-0">{team.striker1.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    ST
                  </p>
                </td>
                <td>{team.striker1.team}</td>
                <td>{team.striker1.points}</td>

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
                    Add Striker
                  </button>
                </td>
              </tr>
            )}

            {team.striker2 ? (
              <tr>
                <th scope="row">2</th>
                <td>
                  <h6 className="m-0 p-0">{team.striker2.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    ST
                  </p>
                </td>
                <td>{team.striker2.team}</td>
                <td>{team.striker2.points}</td>

                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openPlayerModel2()}
                  >
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => deletePlayer2(team._id)}
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
                    onClick={() => openAddModel2()}
                  >
                    Add Striker
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
        cat="st"
      />
      <AddPlayer
        modalIsOpen={modal2}
        closeModal={closeAddModal2}
        team={team}
        cat="ker"
      />
      {team.striker1 ? (
        <PlayerInfo
          modalIsOpen={playerMoal}
          closeModal={closePlayerModal}
          player={team.striker1}
        />
      ) : null}

      {team.striker2 ? (
        <PlayerInfo
          modalIsOpen={playerMoal2}
          closeModal={closePlayerModal2}
          player={team.striker2}
        />
      ) : null}
    </section>
  );
}

export default Strikers;
