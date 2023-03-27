import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../auth";

export async function action({ request, params }) {
  const token = getAuthToken();

  const musicianId = params.musicianId;
  const method = request.method;
  const data = await request.formData();

  const musicianData = {
    name: data.get("first_name"),
    surname: data.get("last_name"),
    yob: data.get("yob"),
  };
  console.log(musicianData);

  let url = "http://localhost:5000/musicians";

  if (method === "PATCH") {
    url = "http://localhost:5000/musicians/" + musicianId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(musicianData),
  });
  console.log(response);

  if (response.status === 422) {
    return response;
  }

  if (!response) {
    throw json({ message: "Counld not save musician" }, { status: 500 });
  }
  return redirect("..");
}
