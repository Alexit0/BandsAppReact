import { NavLink, useParams, useSubmit } from "react-router-dom";
import classes from "./SecondaryNavigation.module.css";

const BandNavigation = () => {
  const params = useParams();
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null, { method: "delete" });
    }
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to={"edit"}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Edit Band
            </NavLink>
          </li>
          <li>
            <button onClick={startDeleteHandler}>Delete Band</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BandNavigation;
