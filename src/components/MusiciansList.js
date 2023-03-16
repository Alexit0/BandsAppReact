import MusicianButton from "./UI/MusicianButton";

const MusiciansList = ({ musicians }) => {
  return (
    <div>
      <ul>
        {musicians
          .sort((a, b) => a.last_name.localeCompare(b.last_name))
          .map((musician) => (
            <li key={musician.id}>
              <MusicianButton key={musician.id} musician={musician} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MusiciansList;
