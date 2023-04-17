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

  function getFullName(item) {
    return [item.musician.first_name, item.musician.last_name].join(" ");
  }

  const lineUp = data.map((item) => ({
    musicianId: +item.musician.id,
    musicianName: getFullName(item),
    instrumentId: +item.instrument.id,
    instrumentName: item.instrument.name,
  }));
  console.log("lineUp => ", lineUp);

  const newLineUp = Object.values(
    lineUp.reduce((acc, cur) => {
      if (!acc[cur.musicianName]) {
        acc[cur.musicianName] = { ...cur, instrumentName: [] };
      }
      acc[cur.musicianName].instrumentName.push(cur.instrumentName);
      return acc;
    }, {})
  );

  console.log("newLineUp => ", newLineUp);

  return (
    <>
      <h2>{selectedBand[0].name}</h2>
      <h4>{`(${selectedBand[0].country_of_origin})`}</h4>
      <h4> Active since {selectedBand[0].year_formed}</h4>
      <p>-</p>
      <BandsLineup lineup={newLineUp} />
      {token && <LineupForm musiciansList={lineUp} />}
      <p>-</p>
      <Link to="/">back to the Home Page</Link>
    </>
  );
}

export async function loader({ params }) {
  const bandId = params.bandId;

  // lineup endpoint
  const response = await fetch("http://localhost:5000/lineup/" + bandId);
  return response;
}
