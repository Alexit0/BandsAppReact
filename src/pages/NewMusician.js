import MusicianForm from "../components/MusicianForm";

const NewMusicianPage = () => {
  return (
    <>
      <h1>Add New Musician</h1>
      <MusicianForm method="post" />
    </>
  );
};

export default NewMusicianPage;
