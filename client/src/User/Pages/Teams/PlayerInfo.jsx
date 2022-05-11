import React from "react";
import Modal from "react-modal";

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

export default function PlayerInfo(props) {
  const { modalIsOpen, closeModal, player } = props;

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div class="card mb-3">
        <img
          src={`http://localhost:5000/${player.image}`}
          style={{ minheight: "100px", maxWidth: "300px", alignSelf: "center" }}
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">{player.name}</h5>
          <p class="card-text">Position: {player.position}</p>
          <p class="card-text">Team: {player.team}</p>
          <p class="card-text">Points: {player.points}</p>
          <p class="card-text">
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
        </div>
      </div>
    </Modal>
  );
}
