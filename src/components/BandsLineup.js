const BandsLineup = ({ lineup }) => {
  return (
    <>
      <main>
        <h3>Lineup:</h3>
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
