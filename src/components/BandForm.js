import classes from "./Form.module.css";
import { Form, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function BandForm({ method, selectedBand }) {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate("..");
  }
  const [countryState, setCountryState] = useState({
    countries: [],
    errorMessage: "",
    loading: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setCountryState({ loading: true });

        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();

        setCountryState((countryState) => ({
          ...countryState,
          countries,
          loading: true,
        }));
      } catch (err) {
        setCountryState((countryState) => ({
          ...countryState,
          loading: false,
          errorMessage: "Something went wrong",
        }));
      }
    }

    fetchData();
  }, []);

  const { countries } = countryState;

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="name">Band Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={selectedBand ? selectedBand.name : ""}
        />
      </p>
      <p>
        <label htmlFor="year_formed">Year Formed</label>
        <input
          id="year_formed"
          type="number"
          min="1900"
          max="2099"
          step="1"
          name="year_formed"
          required
          defaultValue={selectedBand ? selectedBand.year_formed : ""}

        />
      </p>
      <label htmlFor="country_of_origin">Country of Origin</label>
      <select id="country_of_origin" type="text" name="country_of_origin">
        <option>
          {selectedBand
            ? selectedBand.country_of_origin
            : "--- Select Country ---"}
        </option>
        {countries &&
          countries
            .sort((a, b) => a.name.common.localeCompare(b.name.common))
            .map((country) => {
              return (
                <option
                  key={country.cca2}
                  value={country.cca2}
                >{`${country.name.common}, (${country.cca2})`}</option>
              );
            })}
      </select>
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
