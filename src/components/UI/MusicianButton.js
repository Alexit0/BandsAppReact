import { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./MusicianButton.module.css";

const MusicianButton = ({ musician }) => {
  const [hoveredOn, setHoveredOn] = useState(false);

  const onMouseEnterHandler = () => setHoveredOn(true);
  const onMouseLeaveHandler = () => setHoveredOn(false);
  return (
    <NavLink to={`${musician.id}`}>
      <button
        className={classes.button}
        onMouseOver={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        {`${musician.first_name} ${musician.last_name} `}
        {hoveredOn && musician.yob !== 0 && `(${musician.yob})`}
      </button>
    </NavLink>
  );
};

export default MusicianButton;
