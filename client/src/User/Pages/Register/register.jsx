import React, { useState } from "react";
import Logo from "../../../Shared/Images/user-login-logo.svg";
import Player from "../../../Shared/Images/admin-login-player.svg";
import "../../Components/Css/user-register.css";
import { Link, useHistory } from "react-router-dom";
import { signupValidation } from "../../Components/Validation/signupValidation";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../Shared/Components/spinner";

function Register() {
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerHandle = async (e) => {
    e.preventDefault();
    setErrors("");

    const err = signupValidation({
      name,
      email,
      password,
      confirmPassword,
    });

    if (Object.keys(err).length !== 0) {
      setErrors(err);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}user/adduser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            password,
            email,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      history.push("/login");
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
    <div className="container-fluid user-register-section">
      {loading && <LoadingSpinner asOverlay />}

      <div className="row">
        <div>
          <div className="register-custom-shape register-custom-shape-1"></div>
          <div className="register-custom-shape register-custom-shape-2"></div>
          <div className="register-custom-shape register-custom-shape-3"></div>
        </div>
        <div className="col-12 col-sm-6 col-md-7 user-register-left-container">
          <form
            onSubmit={registerHandle}
            className="col-10 col-sm-8 col-md-6 admin-register-form"
          >
            <img className="register-logo" src={Logo} alt="Logo" />
            <h5>Register</h5>
            <p>
              Already have an account?{" "}
              <Link className="link" to="/login">
                Login
              </Link>
            </p>
            <div className="form-group mb-3">
              {errors.name && <p className="errors">{errors.name} </p>}
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={(name) => setName(name.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              {errors.email && <p className="errors">{errors.email} </p>}
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                onChange={(email) => setEmail(email.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              {errors.password && <p className="errors">{errors.password}</p>}

              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                onChange={(password) => setPassword(password.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              {errors.confirmpassword && (
                <p className="errors">{errors.confirmpassword}</p>
              )}

              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                placeholder="Confirm Password"
                onChange={(cpassword) =>
                  setConfirmPassword(cpassword.target.value)
                }
              />
            </div>
            <center>
              <button
                type="submit"
                className="btn user-register-button text-white col-6"
                style={{ backgroundColor: "#fe9117" }}
              >
                Register
              </button>
            </center>
          </form>
        </div>
        <div className="d-none d-sm-flex col-sm-6 col-md-5 user-register-right-container">
          <div className="register-custom-shape register-custom-shape-4">
            <img src={Player} className="user-register-player-image" alt="" />
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

export default Register;
