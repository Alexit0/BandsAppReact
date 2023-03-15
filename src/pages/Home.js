import { useLoaderData, json } from "react-router-dom";
import BandsList from "../components/BandsList";

export default function HomePage() {

  const data = useLoaderData();
  const bands = data.bands;
  return (
    <>
      <h1>BandsApp v2.0</h1>
      <BandsList bands={bands} />
    </>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:5000/");

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
