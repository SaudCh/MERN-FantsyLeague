import React from "react";

import "../Css/spinner.css";

//loading sipnner
const LoadingSpinner = (props) => {
    return (
        <div className={`${props.asOverlay && "loading-spinner__overlay"}`}>
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default LoadingSpinner;