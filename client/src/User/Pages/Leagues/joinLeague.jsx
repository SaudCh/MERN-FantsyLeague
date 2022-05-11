import React, { useState } from "react";
import { DeleteIcon } from "../../Components/Icons";
import JoinLeagueModal from "./joinLeagueModal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function JoinLeague(props) {
  const { league, fetchLeague, userId, setLoading } = props;

  const [addLeaguemodal, setaddLeagueModal] = useState(false);

  function openPlayerModel() {
    setaddLeagueModal(true);
  }

  function closePlayerModal() {
    setaddLeagueModal(false);
  }

  const removeLeague = async (leagueId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}league/remove/${leagueId}/${userId}`,
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
      //console.log(responseData);

      setLoading(false);

      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      fetchLeague();
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";
      toast.success(err.message, {
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

  return (
    <section className="container-fluid mt-5 px-3 pb-5">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="fw-bold">Friends League</h4>
        <button
          onClick={() => openPlayerModel()}
          className="btn btn-sm btn-success"
        >
          Join
        </button>
      </div>
      <hr />
      <p>
        Take your turn to pick from the pool and build a 5-man squad unique to
        you.
      </p>
      <div className="row">
        {league
          ? league.map((e) => {
              return (
                <div
                  className="col-6 col-md-2 "
                  style={{ position: "relative" }}
                >
                  <button
                    className="btn btn-sm"
                    onClick={() => removeLeague(e._id)}
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 10,
                      zIndex: 10,
                    }}
                  >
                    <DeleteIcon />
                  </button>
                  <Link
                    to={`/draft/${e._id}`}
                    className="league-info-container link "
                  >
                    <h4>{e.name}</h4>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
      <JoinLeagueModal
        league={league}
        userId={userId}
        modalIsOpen={addLeaguemodal}
        closeModal={closePlayerModal}
        fetchLeague={fetchLeague}
      />
    </section>
  );
}
