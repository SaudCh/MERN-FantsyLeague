import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useChkUserAuth } from "../Hooks/chkAuth";
import { toast } from "react-toastify";

function Header() {
  const history = useHistory();
  const { userLogout, isUserLoggedIn } = useChkUserAuth();
  //console.log(userId);
  const logout = () => {
    userLogout();
    history.push("/");
    toast.success("Logged Out", {
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
    <nav
      class="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#fe9117" }}
    >
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">
          FantsyLeague
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to={isUserLoggedIn ? "/team" : "/login"}
                class="nav-link active"
                aria-current="page"
              >
                Team
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to={isUserLoggedIn ? "/league" : "/login"}
                class="nav-link active"
                aria-current="page"
              >
                Leagues
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to={"/standing"}
                class="nav-link active"
                aria-current="page"
              >
                Standings
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/draft" class="nav-link">
                Global
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/about" class="nav-link">
                About Us
              </Link>
            </li>
            <li class="nav-item">
              <Link to="/faq" class="nav-link">
                FAQ
              </Link>
            </li>
            <li class="nav-item me-4">
              <Link to="/rule" class="nav-link">
                Rules
              </Link>
            </li>
          </ul>

          {!isUserLoggedIn ? (
            <Link to="/login" className="btn btn-sm btn-success">
              Login/Signup
            </Link>
          ) : (
            <button onClick={() => logout()} className="btn btn-sm btn-danger">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
