const BandsLineup = ({ lineup }) => {
  return (
    <>
      <main>
        {lineup.length > 0 ? <h4>Lineup:</h4> : <h4>Lineup info not available</h4>}
        <ul>
          {lineup.map((musician) => (
            <li key={musician.musicianName + musician.instrumentName}>
              {musician.musicianName} - {musician.instrumentName.join(" / ")}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default BandsLineup;
