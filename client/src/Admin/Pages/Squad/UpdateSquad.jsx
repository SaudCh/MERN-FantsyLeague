import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function UpdatePlayer(props) {
  const { modalIsOpen, closeModal, res } = props;
  const [name, setName] = useState();
  const [games, setGames] = useState(0);
  const [win, setWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gd, setGd] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    setName(res.name);
    setGames(res.gamesPlayed);
    setWins(res.wins);
    setDraws(res.draws);
    setLosses(res.losses);
    setGd(res.gd);
    setPoints(res.points);
  }, [res]);

  const updateplayer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}squad/update`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sid: res._id,
            name,
            gamesPlayed: games,
            wins: win,
            draws,
            losses,
            gd,
            points,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      //console.log(err || "Something went wrong");
      toast.error(err.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h4>Update Squad</h4>

      <form>
        <div>
          <label className="mb-1">Name</label>
          <input
            type="text"
            className="form-control mb-2"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1">Games Played</label>
          <input
            type="number"
            className="form-control mb-2"
            value={games}
            name="team"
            onChange={(e) => setGames(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1">Wins</label>
          <input
            type="number"
            className="form-control mb-2"
            value={win}
            name="position"
            onChange={(e) => setWins(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1">Draw</label>
          <input
            type="number"
            className="form-control mb-2"
            value={draws}
            name="position"
            onChange={(e) => setDraws(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1">Losses</label>
          <input
            type="number"
            className="form-control mb-2"
            value={losses}
            name="position"
            onChange={(e) => setLosses(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1">Goal Difference</label>
          <input
            type="number"
            className="form-control mb-2"
            value={gd}
            name="position"
            onChange={(e) => setGd(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1">Points</label>
          <input
            type="number"
            className="form-control mb-2"
            value={points}
            name="points"
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary form-control"
          onClick={(e) => updateplayer(e)}
        >
          Add
        </button>
      </form>
    </Modal>
  );
}

export default UpdatePlayer;
