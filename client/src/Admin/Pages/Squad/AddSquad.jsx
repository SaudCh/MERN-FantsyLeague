import React, { useState } from "react";
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

function AddPlayer(props) {
  const { modalIsOpen, closeModal } = props;
  const [name, setName] = useState();
  const [games, setGames] = useState(0);
  const [win, setWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gd, setGd] = useState(0);
  const [points, setPoints] = useState(0);
  const [file, setFile] = useState();

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };

  const addDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("gamesPlayed", games);
    formData.append("wins", win);
    formData.append("draws", draws);
    formData.append("losses", losses);
    formData.append("gd", gd);
    formData.append("points", points);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}squad/add`,
        {
          method: "POST",
          body: formData,
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
    setFile("");
    setName("");
    setGames("");
    setWins("");
    setDraws("");
    setLosses("");
    setGd("");
    setPoints("");
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
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

        <div className="mb-2">
          <div>
            <label className="mb-1">Image</label>
          </div>
          <input
            type="file"
            // value={file}
            accept=".jpg,.png,.jpeg"
            onChange={handleChange}
          />
        </div>

        <button
          className="btn btn-primary form-control"
          onClick={(e) => addDetails(e)}
        >
          Add
        </button>
      </form>
    </Modal>
  );
}

export default AddPlayer;
