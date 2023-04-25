import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import BandsLineup from "../components/BandsLineup";
import LineupForm from "../components/LineupForm";

export default function BandPage() {
  const params = useParams();
  const basicData = useRouteLoaderData("band-basic-info");
  const data = useRouteLoaderData("lineup");
  const token = useRouteLoaderData("root");

  const bandId = params.bandId;
  const selectedBand = basicData.filter((obj) => obj.id === +bandId);

  // Get musician full name
  function getFullName(item) {
    return [item.musician_first_name, item.musician_last_name].join(" ");
  }

  // Get all members ever
  const lineUp = data.map((item) => ({
    musicianId: +item.musician_id,
    musicianName: getFullName(item),
    instrumentId: +item.instrument_id,
    instrumentName: item.instrument_name,
    quitBand: +item.quit_band,
    bandEnds: +item.bands_end,
    startsPlaying: +item.started_playing,
  }));

  // Get the latest lineup
  const latestLineup = lineUp.filter(
    (member) => member.quitBand === member.bandEnds
  );

  // Reduce latest lineup to readable solution
  const newLineUp = Object.values(
    latestLineup.reduce((acc, cur) => {
      if (!acc[cur.musicianName]) {
        acc[cur.musicianName] = { ...cur, instrumentName: [] };
      }
      acc[cur.musicianName].instrumentName.push(cur.instrumentName);
      return acc;
    }, {})
  );

  // Get past members
  const pastMembers = [
    ...new Set(
      lineUp
        .map((member) => member.musicianName)
        .filter(
          (x) => !newLineUp.map((member) => member.musicianName).includes(x)
        )
    ),
  ];

  return (
    <>
      <h2>{selectedBand[0].name}</h2>
      <h4>{`(${selectedBand[0].country_of_origin})`}</h4>
      <img src={selectedBand[0].image} width={300} alt="band_image" />
      <h4>
        {" "}
        {selectedBand[0].year_end
          ? `Years active: ${selectedBand[0].year_formed} - ${selectedBand[0].year_end}`
          : `Active from ${selectedBand[0].year_formed}`}
      </h4>
      <h5>(Current status: {selectedBand[0].status})</h5>
      <p>-</p>
      <BandsLineup lineup={newLineUp} pastMembers={pastMembers} />
      {token && <LineupForm musiciansList={lineUp} />}
      <Link to="/">back to the Home Page</Link>
    </>
  );
}

export async function loader({ params }) {
  const bandId = params.bandId;

  // Lineup endpoint
  const response = await fetch("http://localhost:5000/lineup/" + bandId);
  return response;
}
