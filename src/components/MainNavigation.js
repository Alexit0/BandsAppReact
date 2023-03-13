import { Form, NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/band/new"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Add Band
            </NavLink>
          </li>
          <li>
            <NavLink
              to="auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
