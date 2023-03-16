import { useRouteLoaderData, Link } from "react-router-dom";
import MusicianForm from "../components/MusicianForm";

const EditMusicianPage = () => {
  const musicianInfo = useRouteLoaderData("musician-details");

  return (
    <>
      <h1>Edit {musicianInfo.first_name}</h1>
      <MusicianForm musicianInfo={musicianInfo} method="patch" />

      <Link to="..">Back</Link>
    </>
  );
};

export default EditMusicianPage;
