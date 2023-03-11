import { NavLink, useParams } from "react-router-dom";
import classes from "./BandsNavigation.module.css";

const BandsNavigation = () => {
  const params = useParams();
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to={`${params.bandName}/edit`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Edit Band
            </NavLink>
          </li>
          <li>
            <NavLink
              to="new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add New Band
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default BandsNavigation;
