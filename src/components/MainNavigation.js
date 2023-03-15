import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const token = useRouteLoaderData("root");

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {" "}
          <li>
            <NavLink
              to="about"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Home
            </NavLink>
          </li>{" "}
          <li>
            <NavLink
              to="musicians"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Musicians
            </NavLink>
          </li>
          {token && (
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
          )}
          {!token && (
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
          )}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
