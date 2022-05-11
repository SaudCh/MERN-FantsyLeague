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

export default function JoinLeagueModal(props) {
  const { modalIsOpen, closeModal, userId, fetchLeague } = props;

  const [id, setId] = useState();

  const createLeague = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}league/join/${id}/${userId}`,
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

      fetchLeague();

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
      <form>
        <div>
          <label className="mb-2">Id</label>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary form-control"
          onClick={(e) => createLeague(e)}
        >
          Join
        </button>
      </form>
    </Modal>
  );
}
