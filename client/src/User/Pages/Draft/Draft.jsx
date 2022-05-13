import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../../Shared/Components/spinner";
import Header from "../../Components/Header/Header";
import DraftImg from "../../Components/Images/draft.png";
import DraftData from "./draftData";
import PlayerModal from "./playerModal";

export default function Draft() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [teamId, setTeamId] = useState("");

  function openModal(id) {
    setIsOpen(true);
    setTeamId(id);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}user/viewall`,
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

        setUsers(responseData.data);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        //console.log(err.message);
        //setErrors(errs)
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {loading && <LoadingSpinner asOverlay />}
      <Header />
      <section className="row fansty-container m-0 p-0">
        <div className="col-6 d-flex justify-content-center align-items-center">
          <h1 className="fansty-heading">Fantasy League</h1>
        </div>
        <div className="col-6 d-flex justify-content-center align-items-center">
          <img src={DraftImg} className="league-image" alt="" />
        </div>
      </section>

      <section className="container-fluid mt-5 px-3 pb-5">
        <h4 className="fw-bold">Global League</h4>
        <hr />
        <p>
          Take your turn to pick from the pool and build a 5-man squad unique to
          you.
        </p>

        <DraftData
          users={users}
          setLoading={setLoading}
          openModal={openModal}
        />
        <PlayerModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          userId={teamId}
          setLoading={setLoading}
        />
      </section>
    </div>
  );
}
