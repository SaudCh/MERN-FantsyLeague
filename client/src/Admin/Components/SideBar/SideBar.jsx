import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faVolleyball,
  faChartLine,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import "../Css/admin-sidebar.css";
import { AdminAuthContext } from "../Context/AuthContext";

function SideBar() {
  let { url } = useRouteMatch();

  const history = useHistory();
  const adminContext = useContext(AdminAuthContext);

  const [active, setActive] = useState(true);
  const hideSideBar = () => {
    setActive(!active);
  };

  const logout = () => {
    adminContext.logout();
    history.push("/admin");
  };

  return (
    <div className={`adm-sidebar ${active ? "active" : null} `}>
      <div className="ad-sd-box1"></div>
      <div className="ad-sd-box2"></div>
      <div className="logo">
        <div className="ad-sb-cmp">
          <h4>FantasyLeague</h4>
        </div>
        <FontAwesomeIcon
          onClick={() => hideSideBar()}
          className="ad-sb-bars-icon"
          icon={faBars}
          id="bars"
        />
      </div>
      <ul className="ad-sb-menu">
        <li>
          <Link to={`${url}/users`} className="ad-sb-link">
            <FontAwesomeIcon icon={faUser} />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to={`${url}/teams`} className="ad-sb-link">
            <FontAwesomeIcon icon={faVolleyball} />
            <span>Leagues</span>
          </Link>
        </li>
        <li>
          <Link to={`${url}/players`} className="ad-sb-link">
            <FontAwesomeIcon icon={faChartLine} />
            <span>Players</span>
          </Link>
        </li>
      </ul>
      <ul className="ad-sb-menu logout-menu">
        <li>
          <button onClick={() => logout()} className="btn p-0 m-0 ad-sb-link">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
