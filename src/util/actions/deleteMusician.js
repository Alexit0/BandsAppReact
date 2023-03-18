import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../auth";


export async function deleteMusicianAction({ params, request }) {
  const musicianId = params.musicianId;
  const token = getAuthToken();


  console.log("musicianId => ", musicianId);
  console.log("method => ", params.method);
  console.log("params => ", params);

  const response = await fetch(
    "http://localhost:5000/musicians/" + musicianId,
    {
      method: request.method,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
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
