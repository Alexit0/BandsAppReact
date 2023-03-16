import { Outlet } from "react-router-dom";
import MusicianNavigation from "../components/MusicianNavigation";

const MusiciansRootLayout = () => {
  return (
    <>
      <MusicianNavigation />
      <Outlet />
    </>
  );
};

export default MusiciansRootLayout;
