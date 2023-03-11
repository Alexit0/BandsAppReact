import React from "react";

import classes from "./ModalButton.module.css";

const ModalButton = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span>{props.buttonName}</span>
    </button>
  );
};

export default ModalButton;
