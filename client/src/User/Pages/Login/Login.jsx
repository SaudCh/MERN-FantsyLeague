import React, { useContext, useState } from "react";
import Logo from "../../../Shared/Images/user-login-logo.svg";
import Player from "../../../Shared/Images/admin-login-player.svg";
import "../../Components/Css/user-login.css";
import { Link, useHistory } from "react-router-dom";
import { loginValidation } from "../../../Admin/Components/Validation/LoginValidation";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../Shared/Components/spinner";
import { UserAuthContext } from "../../Components/Context/userAuthContext";

function Login() {
  const history = useHistory();
  const userContext = useContext(UserAuthContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setError] = useState("");

  const loginHandle = async (e) => {
    e.preventDefault();

    setError("");

    const err = loginValidation({ email, password });

    if (Object.keys(err).length !== 0) {
      setError(err);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}user/login/${email}/${password}`,
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

      userContext.userLogin(responseData.user._id);
      history.push("/");
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
    <div className="container-fluid user-login-section">
      {loading && <LoadingSpinner asOverlay />}

      <div className="row">
        <div>
          <div className="login-custom-shape login-custom-shape-1"></div>
          <div className="login-custom-shape login-custom-shape-2"></div>
          <div className="login-custom-shape login-custom-shape-3"></div>
        </div>
        <div className="col-12 col-sm-6 col-md-7 user-login-left-container">
          <form
            onSubmit={loginHandle}
            className="col-10 col-sm-8 col-md-6 admin-login-form"
          >
            <img className="login-logo" src={Logo} alt="Logo" />
            <h5>Login</h5>
            <p>
              Not have an Account?{" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </p>
            <div className="form-group mb-4">
              {errors.email && <p className="errors">{errors.email} </p>}
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div className="form-group mb-1">
              {errors.password && <p className="errors">{errors.password}</p>}

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(password) => setPassword(password.target.value)}
              />
            </div>
            <p className="text-end p-0">Forget Password?</p>
            <center>
              <button
                type="submit"
                className="btn admin-login-button text-white col-6"
                style={{ backgroundColor: "#fe9117" }}
              >
                Login
              </button>
            </center>
          </form>
        </div>
        <div className="d-none d-sm-flex col-sm-6 col-md-5 user-login-right-container">
          <div className="login-custom-shape login-custom-shape-4">
            <img src={Player} className="user-login-player-image" alt="" />
          </div>
          <p className="p-0 col-8 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            sed iure unde et molestiae fugiat soluta deleniti ducimus neque
            optio.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
