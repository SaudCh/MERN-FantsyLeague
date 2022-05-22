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
  const [team, setTeam] = useState();
  const [position, setPosition] = useState();
  const [points, setPoints] = useState(0);
  const [file, setFile] = useState();

  //function calls when image is selected
  const handleChange = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };

  //function to add player api call
  const addDetails = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);
    formData.append("team", team);
    formData.append("position", position);
    formData.append("points", points);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}player/add`, {
        method: "POST",
        body: formData,
      });
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
          <label className="mb-2">Name</label>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2">Team</label>
          <input
            type="text"
            className="form-control mb-3"
            value={team}
            name="team"
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2">Position</label>
          <input
            type="text"
            className="form-control mb-3"
            value={position}
            name="position"
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2">Points</label>
          <input
            type="number"
            className="form-control mb-3"
            value={points}
            name="points"
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div>
            <label className="mb-2">Image</label>
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
