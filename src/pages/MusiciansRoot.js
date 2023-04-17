import { Outlet, useRouteLoaderData } from "react-router-dom";
import MusicianNavigation from "../components/MusicianNavigation";

const MusiciansRootLayout = () => {
  const token = useRouteLoaderData("root");

  return (
    <>
      { <MusicianNavigation />}
      <Outlet />
    </>
  );
};

export default MusiciansRootLayout;
