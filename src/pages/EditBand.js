import BandForm from "../components/BandForm";
import { Link, useRouteLoaderData, useParams } from "react-router-dom";

const EditBandPage = () => {

  const params = useParams();
  const bandId = params.bandId;

  const data = useRouteLoaderData("band-basic-info");
  const bands = data.bands;
  console.log('bandId => ', bandId)
  const selectedBand = bands.filter((obj) => (
    obj.id === +bandId
  ));
  console.log("selectedBand => ", selectedBand);

  return (
    <main>
      <h1>Edit Band</h1>
      <BandForm method="patch" selectedBand={selectedBand[0]}/>
      <Link to="/">back to the Home Page</Link>
    </main>
  );
};

export default EditBandPage;
