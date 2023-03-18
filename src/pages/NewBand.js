import { Link } from "react-router-dom";
import BandForm from "../components/BandForm";

const NewBandPage = () => {
  return (
    <>
      <main>
        <h1>Add New Band</h1>
        <BandForm method='post'/>
        <Link to="/">back to the Home Page</Link>
      </main>
    </>
  );
};

export default NewBandPage;
