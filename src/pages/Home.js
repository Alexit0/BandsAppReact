import {
  useLoaderData,
  json,
  NavLink,
  useRouteLoaderData,
} from "react-router-dom";
import BandsList from "../components/BandsList";

import classes from "./pages.module.css";

export default function HomePage() {
  const token = useRouteLoaderData("root");
  const bands = useLoaderData();
  console.log(bands);
  // const bands = data.bands;

  return (
    <>
      <h1>BandsApp v2.0</h1>
      {token && (
        <header className={classes.header}>
          <NavLink className={classes.a} to="/bands/new">
            Add Band
          </NavLink>
        </header>
      )}
      <BandsList bands={bands} />
    </>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:5000/bands");

  if (!response.ok) {
    throw json(
      {
        message: "Couldn not fetch bands from database.",
      },
      { status: 500 }
    );
  } else {
    return response;
  }
}
