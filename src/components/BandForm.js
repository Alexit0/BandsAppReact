import classes from "./BandForm.module.css";
import { Form, useNavigate } from "react-router-dom";

function BandForm() {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("/");
  }

  return (
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="name">Band Name</label>
        <input id="name" type="text" name="name" required />
      </p>
      <p>
        <label htmlFor="year_formed">Year Formed</label>
        <input id="year_formed" type="text" name="year_formed" required />
      </p>
      <p>
        <label htmlFor="country_of_origin">Country of Origin</label>
        <input
          id="country_of_origin"
          type="text"
          name="country_of_origin"
          required
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </Form>
  );
}

export default BandForm;
