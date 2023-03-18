import {
  json,
  NavLink,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import MusiciansList from "../components/MusiciansList";

import classes from "./pages.module.css";

const MusiciansPage = () => {
  const token = useRouteLoaderData("root");

  const data = useLoaderData();
  const musicians = data.musicians;
  return (
    <>
      <h1>BandsApp v2.0</h1>
      {token && (
        <header className={classes.header}>
          <NavLink className={classes.a} to="/musicians/new">
            Add Musician
          </NavLink>
        </header>
      )}
      <MusiciansList musicians={musicians} />
    </>
  );
};

export default MusiciansPage;

export async function loader() {
  const response = await fetch("http://localhost:5000/musicians");

  if (!response.ok) {
    throw json({ message: "Could not fetch musicians from database " });
  } else {
    return response;
  }
}
