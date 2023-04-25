import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Modal.module.css";
import ModalButton from "./ModalButton";

const Modal = (props) => {
  const onCloseHandler = () => {
    props.onClose([]);
  };

  return (
    <div>
      <div className={classes.backdrop} />
      <div className={classes.modal}>
        <h2>{props.content[1]}</h2>
        {props.content[4] && <img src={props.content[4]} width={200} alt=""/>}

        <h3>{props.content[3]}</h3>
        <p> Originated in {props.content[2]}</p>
        <div className={classes.content}></div>
        <footer className={classes.actions}>
          <ModalButton buttonName="Close" onClick={onCloseHandler} />

          <NavLink to={`bands/${props.content[0]}`}>
            <ModalButton buttonName="More" />
          </NavLink>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
