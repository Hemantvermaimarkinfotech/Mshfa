import "./index.scss";

import React from "react";

import openLink from "assets/images/open-link.svg";

const OpenOrderButton = ({ onClick }) => {
  return (
    <button className={"open-order-button"} onClick={onClick}>
      <img
        className={"open-order-button__icon"}
        src={openLink}
        alt="Check Details"
      />
      <span className={"open-order-button__text"}>Check Details</span>
    </button>
  );
};

export default OpenOrderButton;
