import { Link, useParams, useLoaderData } from "react-router-dom";
import BandsLineup from "../components/BandsLineup";

export default function BandPage() {
  const params = useParams();
  const data = useLoaderData();

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

  return (
    <>
      <h2>{params.bandName}</h2>
      <BandsLineup lineup={newLineUp} />
      <Link to="/">back to the Home Page</Link>
    </>
  );
}

export async function loader({ request, params }) {
  const bandName = params.bandName;

  const response = await fetch("http://localhost:5000/band/" + bandName);
  return response;
}
