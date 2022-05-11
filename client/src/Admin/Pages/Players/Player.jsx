import React, { useEffect, useState } from "react";
import "../../Components/Css/admin-user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PointModal from "./PointModal";

import { faBitcoin } from "@fortawesome/free-brands-svg-icons";

import LoadingSpinner from "../../../Shared/Components/spinner";
import AddPlayer from "./AddPlayer";
import { toast } from "react-toastify";
import UpdatePlayer from "./UpdatePlayer";
import Modal from "react-modal";

function Players() {
  const [player, setPlayer] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [pointModal, setPointModal] = useState(false);
  const [response, setResponse] = useState("");

  const fetchPlayers = async () => {
    try {
      setLoading(true);
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

      setPlayer(responseData.data);

      setLoading(false);
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";
      // //console.log(err.message);
      //setErrors(errs)
      toast.error(errs.api, {
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

  const deletePlayer = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}player/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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

      fetchPlayers();

      setLoading(false);
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";

      toast.error(errs.api, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //setErrors(errs)
    }
  };

  function openAddModel() {
    setAddModal(true);
  }

  function closeAddModal() {
    setAddModal(false);
    fetchPlayers();
  }

  function openUpdateModel(res) {
    setResponse(res);
    setUpdateModal(true);
  }

  function closeUpdateModal() {
    setUpdateModal(false);
    fetchPlayers();
  }

  function oPointModal(res) {
    setResponse(res);
    setPointModal(true);
  }

  function cPointModal() {
    setPointModal(false);
    fetchPlayers();
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
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

        setPlayer(responseData.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        //console.log(err.message);
        //setErrors(errs)
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div className="col-9 bg-white admin-user-table">
      {Modal.setAppElement("body")}
      {loading && <LoadingSpinner asOverlay />}
      <div className="adm-heading-container">
        <div className="d-flex align-items-center justify-content-between">
          <span className="adm-us-heading">Players</span>
          <button
            className="btn btn-sm btn-primary me-4"
            onClick={openAddModel}
          >
            Add
          </button>
        </div>
      </div>
      <div className="inp-container border">
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
      <div className="ad-data-detail">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Points</th>
              <th scope="col">Team</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {player
              .filter((val) =>
                val.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((res, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{res.name}</td>
                    <td>{res.points}</td>
                    <td>{res.team}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => openUpdateModel(res)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => deletePlayer(res._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="btn btn-sm btn-success ms-2"
                        onClick={() => oPointModal(res)}
                      >
                        <FontAwesomeIcon icon={faBitcoin} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <AddPlayer modalIsOpen={addModal} closeModal={closeAddModal} />
      <UpdatePlayer
        modalIsOpen={updateModal}
        closeModal={closeUpdateModal}
        res={response}
      />
      <PointModal
        modalIsOpen={pointModal}
        closeModal={cPointModal}
        res={response}
      />
    </div>
  );
}

export default Players;
