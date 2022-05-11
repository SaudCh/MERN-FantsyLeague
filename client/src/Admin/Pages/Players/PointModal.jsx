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

function UpdatePoints(props) {
  const { modalIsOpen, closeModal, res } = props;
  const [points, setPoints] = useState();

  useEffect(() => {
    setPoints(res.points);
  }, [res]);

  const updatePoints = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}player/updatepoints`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: res._id,
            prevPoint: res.points,
            currpoints: points,
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
          <label className="mb-2">Points</label>
          <input
            type="number"
            className="form-control mb-3"
            value={points}
            name="points"
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary form-control"
          onClick={(e) => updatePoints(e)}
        >
          Update
        </button>
      </form>
    </Modal>
  );
}

export default UpdatePoints;
