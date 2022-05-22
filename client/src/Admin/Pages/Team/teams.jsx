import React, { useEffect, useState } from "react";
import "../../Components/Css/admin-user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../../Shared/Components/spinner";
import { toast } from "react-toastify";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  //function to fetch leagues
  const fetchLeagues = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}league/viewall`,
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

      setTeams(responseData.leagues);

      setLoading(false);
    } catch (err) {
      setLoading(false);

      let errs = {};
      errs.api = err.message || "Something went wrong, please try again.";
      //console.log(err.message);
      //setErrors(errs)
    }
  };

  //deletes league api call funtion
  const deleteLeague = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}league/delete/${id}`,
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

      fetchLeagues();

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

  //call the fetch Leagues function when the page loads
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}league/viewall`,
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

        setTeams(responseData.leagues);

        setLoading(false);
      } catch (err) {
        setLoading(false);

        let errs = {};
        errs.api = err.message || "Something went wrong, please try again.";
        //console.log(err.message);
        //setErrors(errs)
      }
    };

    fetchLeagues();
  }, []);

  return (
    <div className="col-9 bg-white admin-user-table">
      {loading && <LoadingSpinner asOverlay />}

      <div className="adm-heading-container">
        <span className="adm-us-heading">Leagues</span>
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
              <th scope="col">Created By</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {teams
              .filter((val) =>
                val.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((res, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{res.name}</td>
                    <td>{res.createdBy.name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() => deleteLeague(res._id)}
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
    </div>
  );
}

export default Teams;
