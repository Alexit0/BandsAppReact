import { Link, useRouteLoaderData, json, redirect } from "react-router-dom";

const MusicianPage = () => {
  const data = useRouteLoaderData("musician-details");

  return (
    <>
      <h1>Profile</h1>
      <p>Name: {data.first_name}</p>
      <p>Surname: {data.last_name}</p>
      <p>Year of birth: {data.yob}</p>
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

export async function action({ params, request }) {
  const musicianId = params.musicianId;

  console.log("musicianId => ", musicianId);
  console.log("method => ", params.method);

  const response = await fetch(
    "http://localhost:5000/musicians/" + musicianId,
    { method: request.method }
  );
  console.log("response => ", response);

  if (!response.ok) {
    throw json(
      { message: "Could not delete musician." },
      {
        status: 500,
      }
    );
  }
  return redirect("/musicians");
}
