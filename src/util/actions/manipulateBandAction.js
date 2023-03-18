import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../auth";

export async function action({ request, params }) {
  const token = getAuthToken();

  const bandId = params.bandId;
  console.log(bandId);
  const method = request.method;
  const data = await request.formData();

  const enteredData = {
    name: data.get("name"),
    country_of_origin: data.get("country_of_origin"),
    year_formed: data.get("year_formed"),
  };

  let url = "http://localhost:5000/band/new";

  if (method === "PATCH") {
    url = "http://localhost:5000/band/" + bandId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(enteredData),
  });

  console.log(response);

  if (!response.ok) {
    console.log("could not save event");
    throw json({ message: "Could not save event" });
  }

  return redirect("/");
}
