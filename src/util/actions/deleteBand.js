import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../auth";

export async function deleteBandAction({ params, request }) {
  const bandId = params.bandId;

  const method = request.method;
  const token = getAuthToken();

  console.log("musicianId => ", bandId);
  console.log("params => ", params);
  console.log("method => ", params.method);

  const response = await fetch("http://localhost:5000/band/" + bandId, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete band." },
      {
        status: 500,
      }
    );
  }
  return redirect("/");
}
