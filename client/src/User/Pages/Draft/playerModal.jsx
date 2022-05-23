import React, { useEffect, useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
  },
};

//modal to print team data
//can be opened from draft.jsx and draftById.jsx
export default function PlayerModal(props) {
  const { modalIsOpen, closeModal, userId, setLoading } = props;
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
        // console.log(responseData.data);

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

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div>
        <h3>Team</h3>
        <hr />
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th scope="col" style={{ width: "50%" }}>
                Name
              </th>
              <th scope="col" style={{ width: "25%" }}>
                Team
              </th>
              <th scope="col" style={{ width: "25%" }}>
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {team.striker1 ? (
              <tr>
                <td>
                  <h6 className="m-0 p-0">{team.striker1.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    Striker
                  </p>
                </td>
                <td>{team.striker1.team}</td>
                <td>{team.striker1.points}</td>

                <td></td>
              </tr>
            ) : null}

            {team.striker2 ? (
              <tr>
                <td>
                  <h6 className="m-0 p-0">{team.striker2.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    Striker
                  </p>
                </td>
                <td>{team.striker2.team}</td>
                <td>{team.striker2.points}</td>
              </tr>
            ) : null}

            {team.defender ? (
              <tr>
                <td>
                  <h6 className="m-0 p-0">{team.defender.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    Defender
                  </p>
                </td>
                <td>{team.defender.team}</td>
                <td>{team.defender.points}</td>
              </tr>
            ) : null}

            {team.goalkeeper ? (
              <tr>
                <td>
                  <h6 className="m-0 p-0">{team.goalkeeper.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    GoalKeeper
                  </p>
                </td>
                <td>{team.goalkeeper.team}</td>
                <td>{team.goalkeeper.points}</td>
              </tr>
            ) : null}

            {team.midfilder ? (
              <tr>
                <td>
                  <h6 className="m-0 p-0">{team.midfilder.name}</h6>
                  <p className="m-0 p-0" style={{ fontSize: 12 }}>
                    Mid Fielder
                  </p>
                </td>
                <td>{team.midfilder.team}</td>
                <td>{team.midfilder.points}</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </Modal>
  );
}
