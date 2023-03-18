import { Outlet, useRouteLoaderData } from "react-router-dom";
import BandNavigation from "../components/BandNavigation";


const BandsRootLayout = () => {
  const token = useRouteLoaderData("root");

  return (
    <>
      {token && <BandNavigation />}
      <Outlet />
    </>
  );
};

export default BandsRootLayout;
