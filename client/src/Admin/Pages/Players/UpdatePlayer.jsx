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
  const [name, setName] = useState(res.name);
  const [team, setTeam] = useState(res.team);
  const [position, setPosition] = useState(res.position);

  useEffect(() => {
    setName(res.name);
    setTeam(res.team);
    setPosition(res.position);
  }, [res]);

  const updateplayer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}player/update`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: res._id,
            name,







            
            position,
            team,
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
      //   onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h4>Update Player</h4>
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

        {/* <div className="mb-3">
          <div>
            <label className="mb-2">Image</label>
          </div>
          <input
            type="file"
            // value={file}
            accept=".jpg,.png,.jpeg"
            onChange={handleChange}
          />
        </div> */}

        <button
          className="btn btn-primary form-control"
          onClick={(e) => updateplayer(e)}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default UpdatePlayer;
