import { getAuthToken } from "../util/auth";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams, useSubmit } from "react-router-dom";
import classes from "./LineupForm.module.css";
import lineupReducer from "../reducers/lineupReducer";

const LineupForm = ({ musiciansList }) => {
  const submit = useSubmit();
  const params = useParams();
  const token = getAuthToken();
  const navigate = useNavigate();
  function navigateHandler() {
    navigate(".");
  }
  const [instruments, setInstruments] = useState([]);
  const [musicians, setMusicians] = useState([]);
  const [editIsActive, setEditIsActive] = useState(false);
  const [lineUpData, dispatch] = useReducer(lineupReducer, [
    { musicianId: "", musicianName: "", instrumentId: "", instrumentName: "" },
  ]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/instruments");
      const data = await response.json();
      setInstruments([...data.instruments]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:5000/musicians");
      const data = await response.json();
      setMusicians([...data.musicians]);
    }
    fetchData();
  }, []);

  const handleGetLineup = (event) => {
    event.preventDefault();
    dispatch({
      type: "GET_MUSICIANS",
      musician: musiciansList,
    });
    setEditIsActive(true);
  };

  const handleAddPosition = (event) => {
    dispatch({ type: "ADD_POSITION" });
    event.preventDefault();
  };

  const handleRemovePosition = (index, event) => {
    dispatch({ type: "REMOVE_POSITION", index });
    event.preventDefault();
  };

  const handleChangePosition = (event, index) => {
    dispatch({ type: "UPDATE_POSITION", payload: { event, index } });
    console.log("lineUpData =>", lineUpData);
  };

  const handleCancel = () => {
    setEditIsActive(false);
    navigate();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const proceed = window.confirm("Are you sure?");

    if (proceed) {
      submit(null);
    } else {
      return;
    }
    const bandId = params.bandId;
    const newData = lineUpData.map(({ musicianId, instrumentId }) => {
      return {
        band_id: +bandId,
        musician_id: musicianId,
        instrument_id: instrumentId,
      };
    });

    const response = await fetch(
      `http://localhost:5000/band/${params.bandId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(newData),
      }
    );
    setEditIsActive(false);
    navigateHandler();
  };

  return (
    <>
      {!editIsActive && (
        <button className={classes.button} onClick={handleGetLineup}>
          Edit Lineup:
        </button>
      )}
      {editIsActive && (
        <form onSubmit={handleSubmit}>
          <main className={classes.main}>
            <label>
              <h3>Manipualate lineup:</h3>
            </label>
            {lineUpData &&
              lineUpData.map((position, index) => (
                <div key={index} className={classes.div}>
                  <div className={classes["div-sections"]}>
                    <div className={classes["section-1"]}>
                      <label htmlFor="musicianName">Select musician</label>
                      <select
                        type="text"
                        name="musicianName"
                        value={position.musicianName}
                        onChange={(event) => handleChangePosition(event, index)}
                        required
                      >
                        <option disabled></option>
                        {musicians &&
                          musicians.map((musician) => {
                            return (
                              <option
                                key={musician.id}
                                musician-id={musician.id}
                              >
                                {musician.first_name} {musician.last_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className={classes["section-2"]}>
                      <label htmlFor="instrumentName">Select Instrument</label>
                      <select
                        name="instrumentName"
                        type="text"
                        value={position.instrumentName}
                        onChange={(event) => handleChangePosition(event, index)}
                        required
                      >
                        <option disabled></option>
                        {instruments &&
                          instruments.map((instrument) => {
                            return (
                              <option
                                key={instrument.id}
                                instrument-id={instrument.id}
                              >
                                {instrument.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className={classes["section-button"]}>
                      <button
                        onClick={(event) => {
                          handleRemovePosition(index, event);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            <div>
              <button onClick={(event) => handleAddPosition(event)}>
                Add New
              </button>
            </div>
            <div className={classes.action}>
              <button onClick={handleCancel}>Cancel</button>
              <button type="submit">Update</button>
            </div>
          </main>
        </form>
      )}
    </>
  );
};

export default LineupForm;
