const BandsLineup = ({ lineup, pastMembers }) => {


  function lineupStatus() {
    return lineup.length === 0
      ? "Lineup info not available"
      : lineup[0].quitBand
      ? "Latest Lineup: "
      : "Current Lineup: ";
  }

  return (
    <>
      <main>
        <h4>{lineupStatus()}</h4>
        <ul>
          {lineup.map((musician, index) => (
            <li key={index}>
              {musician.musicianName} - {musician.instrumentName.join(" / ")}
            </li>
          ))}
        </ul>
        {pastMembers.length > 0 && <h4>Past members:</h4>}

        <ul>
          {pastMembers.map((musician, index) => (
            <li key={index}>{musician}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default BandsLineup;
