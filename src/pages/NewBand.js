import { json, Link, redirect } from "react-router-dom";
import BandForm from "../components/BandForm";

const NewBandPage = () => {
  return (
    <>
      <main>
        <h1>Add New Band</h1>
        <BandForm />
        <Link to="/">back to the Home Page</Link>
      </main>
    </>
  );
};

export default NewBandPage;

export async function action({ request, params }) {
  const data = await request.formData();
  console.log(data)


  const enteredData = {
    name: data.get("name"),
    year_formed: data.get("year_formed"),
    country_of_origin: data.get("country_of_origin"),
  };

  const response = await fetch("http://localhost:5000/band/new", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(enteredData),
  });

  console.log(response)

  if (!response.ok) {
    console.log("could not save event");
    throw json({ message: "Could not save event" });
  }

  return redirect("/");
}
