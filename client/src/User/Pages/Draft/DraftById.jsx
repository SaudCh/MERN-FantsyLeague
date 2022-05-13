import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../Shared/Components/spinner";
import Header from "../../Components/Header/Header";
import { Copy } from "../../Components/Icons";
import DraftImg from "../../Components/Images/draft.png";
import DraftData from "./draftData";
import { toast } from "react-toastify";

export default function DraftById() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [league, setLeague] = useState("");

  const { id } = useParams();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}league/view/${id}`,
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

        setUsers(responseData.leagues.users);
        setLeague(responseData.leagues);

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
  }, [id]);

  const copytoclip = () => {
    navigator.clipboard.writeText(id);
    toast.success("Copy to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

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
        <h4 className="fw-bold">{league.name ? league.name : ""}</h4>
        <hr />
        <p>
          Use the Id for your friends to join {id}{" "}
          <button className="btn btn-sm" onClick={() => copytoclip()}>
            <Copy />
          </button>
        </p>

        <DraftData users={users} setLoading={setLoading} />
      </section>
    </div>
  );
}
