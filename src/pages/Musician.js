import { Link, useRouteLoaderData } from "react-router-dom";

const MusicianPage = () => {
  const data = useRouteLoaderData("musician-details");

  return (
    <>
      <h1>Profile</h1>
      <p>Name: {data[0].first_name}</p>
      <p>Surname: {data[0].last_name}</p>
      <p>Year of birth: {data[0].yob}</p>
      <Link to="..">back to the Musicians Page</Link>
    </>
  );
};

export default MusicianPage;

export async function loader({ request, params }) {
  const response = await fetch(
    "http://localhost:5000/musicians/" + params.musicianId
  );
  return response;
}
