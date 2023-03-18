import { useNavigate, Form } from "react-router-dom";

import classes from "./Form.module.css";

const MusicianForm = ({ musicianInfo, method }) => {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  console.log('musicianInfo => ', musicianInfo)
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
