import classes from "./MusiciansList.module.css";
// import { useState } from "react";
// import Button from "./UI/Button";

// import Modal from "./UI/Modal/Modal";

const MusiciansList = ({ musicians }) => {
  //   const [selectedMusician, setSelectedMusician] = useState([]);
  return (
    <div>
      {/* {selectedBand.length > 0 && (
        <Modal onClose={setSelectedBand} content={selectedBand} />
      )} */}
      <ul>
        {musicians
          .sort((a, b) => a.last_name.localeCompare(b.last_name))
          .map((musician) => (
            <li key={musician.id}>
              <button
                //   setMusician={setSelectedMusician}
                className={classes.button}
                key={musician.id}
                name={musician.first_name}
                surname={musician.last_name}
                year={musician.yob}
              >{`${musician.first_name} ${musician.last_name}`}</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MusiciansList;
