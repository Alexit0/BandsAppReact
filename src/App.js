import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { loader as bandsLoader } from "./pages/Home";
import BandPage, { loader as bandDetailsLoader } from "./pages/Band";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import EditBandPage from "./pages/EditBand";
import NewBandPage from "./pages/NewBand";
import BandsRootLayout from "./pages/BandsRoot";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import AboutPage from "./pages/About";
import MusiciansPage, { loader as musiciansLoader } from "./pages/Musicians";
import MusicianPage, { loader as musicianDetailLoader } from "./pages/Musician";
import MusiciansRootLayout from "./pages/MusiciansRoot";
import EditMusicianPage from "./pages/EditMusician";
import NewMusicianPage from "./pages/NewMusician";

import { action as manipulateMusicianAction } from "./util/actions/manipulateMusicianAction";
import { action as manipulatateBandAction } from "./util/actions/manipulateBandAction";
import { deleteMusicianAction } from "./util/actions/deleteMusician";
import { deleteBandAction } from "./util/actions/deleteBand";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      { path: "about", element: <AboutPage /> },
      {
        path: "/",
        element: <HomePage />,
        loader: bandsLoader,
      },
      {
        path: "band",
        id: "band-basic-info",
        loader: bandsLoader,
        children: [
          {
            id: "band-details",
            path: ":bandId",
            loader: bandDetailsLoader,
            action: deleteBandAction,
            element: <BandsRootLayout />,
            children: [
              { index: true, element: <BandPage /> },
              {
                path: "edit",
                element: <EditBandPage />,
                action: manipulatateBandAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewBandPage />,
            action: manipulatateBandAction,
            loader: checkAuthLoader,
          },
        ],
      },

      {
        path: "musicians",
        children: [
          {
            path: "",
            id: "musicians-page",
            element: <MusiciansPage />,
            loader: musiciansLoader,
          },
          {
            id: "musician-details",
            path: ":musicianId",
            element: <MusiciansRootLayout />,
            loader: musicianDetailLoader,
            action: deleteMusicianAction,
            children: [
              { index: true, element: <MusicianPage /> },
              {
                path: "edit",
                element: <EditMusicianPage />,
                action: manipulateMusicianAction,
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewMusicianPage />,
            action: manipulateMusicianAction,
            loader: checkAuthLoader,
          },
        ],
      },

      { path: "logout", action: logoutAction },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} className="App" />;
}

export default App;
