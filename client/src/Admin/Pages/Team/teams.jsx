import React, { useEffect, useState } from "react";
import "../../Components/Css/admin-user.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../../Shared/Components/spinner";

function Teams() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}team/viewall?populate=createdBy`,
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

        setTeams(responseData.data);
        console.log(responseData.data);

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
    <div className="col-9 bg-white admin-user-table">
      {loading && <LoadingSpinner asOverlay />}

      <div className="adm-heading-container">
        <span className="adm-us-heading">Teams</span>
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
                        // onClick={() => deletePlayer(res._id)}
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
