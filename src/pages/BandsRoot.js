import { Outlet } from "react-router-dom";
import BandsNavigation from "../components/BandsNavigation";

const BandsRootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default BandsRootLayout;
