import { NavLink, useParams, useSubmit } from "react-router-dom";
import classes from "./MusicianNavigation.module.css";

const MusicianNavigation = () => {
  const params = useParams();
  const submit = useSubmit();

  const musicianId = params.musicianId;

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
              to={`/musicians/${musicianId}/edit`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Edit Musician
            </NavLink>
          </li>
          <li>
            <button type="submit" onClick={startDeleteHandler}>
              Delete Musician
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MusicianNavigation;
