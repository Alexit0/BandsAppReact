import BandForm from "../components/BandForm";
import { Link } from "react-router-dom";

const EditBandPage = () => {
  return (
    <main>
      <h1>Edit Band</h1>
      <BandForm />
      <Link to="/">back to the Home Page</Link>
    </main>
  );
};

export default EditBandPage;
