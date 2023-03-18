import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import BandsLineup from "../components/BandsLineup";

export default function BandPage() {
  const params = useParams();
  const basicData = useRouteLoaderData("band-basic-info");
  const data = useRouteLoaderData("band-details");

  const bandId = params.bandId;
  const selectedBand = basicData.bands.filter((obj) => obj.id === +bandId);

  function getFullName(item) {
    return [item.First_Name, item.Last_Name].join(" ");
  }

  const lineUp = data.map((item) => ({
    name: getFullName(item),
    instrument: item.Instrument,
  }));

  const newLineUp = Object.values(
    lineUp.reduce((acc, cur) => {
      if (!acc[cur.name]) {
        acc[cur.name] = { ...cur, instrument: [] };
      }
      acc[cur.name].instrument.push(cur.instrument);
      return acc;
    }, {})
  );

  console.log("bandId => ", bandId);
  console.log("selectedBand => ", selectedBand);

  return (
    <>
      <h2>{selectedBand[0].name}</h2>
      <h4>{`(${selectedBand[0].country_of_origin})`}</h4>
      <h4> Active since {selectedBand[0].year_formed}</h4>
      <p>-</p>
      <BandsLineup lineup={newLineUp} />
      <p>-</p>
      <Link to="/">back to the Home Page</Link>
    </>
  );
}

export async function loader({ request, params }) {
  const bandId = params.bandId;

  const response = await fetch("http://localhost:5000/band/" + bandId);
  return response;
}
