import { useState } from "react";
import Button from "./UI/Button";

import Modal from "./UI/Modal/Modal";

const BandsList = ({ bands }) => {
  const [selectedBand, setSelectedBand] = useState([]);
  return (
    <div>
      {selectedBand.length > 0 && (
        <Modal onClose={setSelectedBand} content={selectedBand} />
      )}
      <h2>All Bands</h2>
      <ul>
        {bands.map((band) => (
          <li key={band.id}>
            <Button
              setBand={setSelectedBand}
              key={band.id}
              name={band.name}
              year={band.year_formed}
              country={band.country_of_origin}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BandsList;
