import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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

export default function AddGoalKeeper(props) {
  const { modalIsOpen, closeModal, team, cat } = props;

  const [player, setPlayer] = useState();
  const [search, setSearch] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        //setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}player/viewall`,
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

        setAllPlayers(responseData.data);

        // setLoading(false);
      } catch (err) {
        // setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        console.log(err.message);
        //setErrors(errs)
      }
    };

    fetchPlayers();
  }, []);

  const updatePlayer = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}team/update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            player: player,
            team: team._id,
            category: cat,
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
      <div className="inp-container border mb-4">
        <input
          className="search-inp"
          placeholder="Search"
          onChange={(query) => setSearch(query.target.value)}
          type="text"
          name=""
          id=""
        />
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <form action="" className="row" style={{ minWidth: "50vw" }}>
        {allPlayers
          .filter(
            (val) =>
              val.position.toLowerCase().includes(cat.toLowerCase()) &&
              val.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((e) => (
            <div class="form-check col-4 my-1">
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id={e._id}
                value={e._id}
                onChange={(ef) => setPlayer(ef.target.value)}
              />
              <label class="form-check-label" for={e._id}>
                {e.name}
              </label>
            </div>
          ))}
      </form>
      <button
        onClick={() => updatePlayer()}
        className="btn btn-sm btn-primary my-2"
      >
        Add
      </button>
    </Modal>
  );
}
