import { useNavigate, Form, json, redirect } from "react-router-dom";

import classes from "./MusicianForm.module.css";

const MusicianForm = ({ musicianInfo, method }) => {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="first_name">First Name</label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          required
          defaultValue={musicianInfo ? musicianInfo.first_name : ""}
        />
      </p>
      <p>
        <label htmlFor="last_name">Last Name</label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          required
          defaultValue={musicianInfo ? musicianInfo.last_name : ""}
        />
      </p>
      <p>
        <label htmlFor="yob">Year of Birth</label>
        <input
          id="yob"
          type="number"
          min="1900"
          max="2099"
          step="1"
          name="yob"
          required
          defaultValue={musicianInfo ? musicianInfo.yob : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
};

export default MusicianForm;

export async function action({ request, params }) {
  const musicianId = params.musicianId;
  console.log(musicianId);

  const method = request.method;
  console.log(toString(method));
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify(musicianData),
  });
  console.log(response)

  if (!response) {
    throw json({ message: "Counld not save event" }, { status: 500 });
  }
  return redirect("..");
}
