import { json, useLoaderData } from "react-router-dom";
import MusiciansList from "../components/MusiciansList";

const MusiciansPage = () => {
  const data = useLoaderData();
  const musicians = data.musicians;
  return (
    <>
      <h1>Musicians list</h1>
      <MusiciansList musicians={musicians}/>
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
