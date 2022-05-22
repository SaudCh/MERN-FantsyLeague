import React, { useEffect, useState } from "react";
import "../../Components/Css/admin-user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faSearch,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import LoadingSpinner from "../../../Shared/Components/spinner";
import AddSquad from "./AddSquad";
import { toast } from "react-toastify";
import UpdateSquad from "./UpdateSquad";
import Modal from "react-modal";

function Squad() {
  const [squads, setSquads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [response, setResponse] = useState("");

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}squad/viewall`,
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

      setSquads(responseData.squad);

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
        `${process.env.REACT_APP_BACKEND_URL}squad/delete/${id}`,
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

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}squad/viewall`,
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

        setSquads(responseData.squad);
        console.log(responseData.squad);

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
          <span className="adm-us-heading">Squad</span>
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
              <th scope="col">Games Played</th>
              <th scope="col">Points</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {squads
              .filter((val) =>
                val.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((res, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{res.name}</td>
                    <td>{res.gamesPlayed}</td>
                    <td>{res.points}</td>
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
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <AddSquad modalIsOpen={addModal} closeModal={closeAddModal} />
      <UpdateSquad
        modalIsOpen={updateModal}
        closeModal={closeUpdateModal}
        res={response}
      />
    </div>
  );
}

export default Squad;
