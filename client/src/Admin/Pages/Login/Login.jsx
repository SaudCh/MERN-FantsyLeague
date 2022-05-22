import React, { useState, useContext } from "react";
import "../../Components/Css/Login.css";
import soccerPlayer from "../../../Shared/Images/admin-login-player.svg";
import { loginValidation } from "../../Components/Validation/LoginValidation";
import { toast } from "react-toastify";
import { AdminAuthContext } from "../../Components/Context/AuthContext";
import { useHistory } from "react-router-dom";
import LoadingSpinner from "../../../Shared/Components/spinner";

function Login() {
  const adminContext = useContext(AdminAuthContext);
  const history = useHistory();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  //call login api to authenticate admin 
  //first check for any errors
  //then call the login api
  const loginHandle = async (e) => {
    e.preventDefault();

    setErrors("");

    const err = loginValidation({
      email,
      password,
    });

    if (Object.keys(err).length !== 0) {
      setErrors(err);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}admin/login/${email}/${password}`,
        {
          method: "GET",
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      adminContext.login(responseData.admin._id);
      history.push("/admin");
      toast.success(responseData.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
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
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      {loading && <LoadingSpinner asOverlay />}

      <div className="row">
        <div className="col-4 admin-login-left-container d-none d-md-flex">
          <img
            className="login-player-image"
            src={soccerPlayer}
            alt="Soccer Player"
          />
          <h5>Login to</h5>
          <h3>Fantasy League</h3>
        </div>
        <div className="col-12 col-md-8 admin-login-right-container">
          <form
            onSubmit={loginHandle}
            className="col-8 col-md-6 admin-login-form"
          >
            <div className="mobile-view d-block d-md-none text-center">
              <img
                className="login-player-image"
                src={soccerPlayer}
                alt="Soccer Player"
              />
              <h5>Login to</h5>
              <h3>Fantasy League</h3>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="email">Email address</label>
              {errors.email && <p className="errors">{errors.email} </p>}
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="password">Password</label>
              {errors.password && <p className="errors">{errors.password}</p>}

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(password) => setPassword(password.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn admin-login-button text-white"
              style={{ backgroundColor: "#fe9117" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
