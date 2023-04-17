import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../auth";

export async function action({ request, params }) {
  const token = getAuthToken();

  const musicianId = params.musicianId;
  const method = request.method;
  const data = await request.formData();

  const musicianData = {
    first_name: data.get("first_name").trim(),
    last_name: data.get("last_name").trim(),
    yob: +data.get("yob"),
  };

  let url = "http://localhost:5000/musicians/";

  if (method === "PATCH") {
    url = url + musicianId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(musicianData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Counld not save musician" }, { status: 500 });
  }
  return redirect("..");
}
