const BandsLineup = ({ lineup }) => {
  return (
    <>
      <main>
        <h3>Lineup:</h3>
        <ul>
          {lineup.map((musician) => (
            <li key={musician.name + musician.instrument}>
              {musician.name} - {musician.instrument.join(" / ")}
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default BandsLineup;
