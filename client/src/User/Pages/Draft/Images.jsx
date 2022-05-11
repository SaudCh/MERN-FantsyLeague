import React from "react";
import FirstPrz from "../../Components/Images/prizes/1st.svg";
import SecPrz from "../../Components/Images/prizes/2nd.svg";
import ThirdPrz from "../../Components/Images/prizes/3rd.svg";

export const FirstPrize = (props) => {
  const { width, height, style } = props;
  return (
    <img
      src={FirstPrz}
      width={width ? width : "auto"}
      height={height ? height : "auto"}
      style={style}
      alt=""
    />
  );
};

export const SecPrize = (props) => {
  const { width, height, style } = props;
  return (
    <img
      src={SecPrz}
      width={width ? width : "auto"}
      height={height ? height : "auto"}
      style={style}
      alt=""
    />
  );
};

export const ThirdPrize = (props) => {
  const { width, height, style } = props;
  return (
    <img
      src={ThirdPrz}
      width={width ? width : "auto"}
      height={height ? height : "auto"}
      style={style}
      alt=""
    />
  );
};
