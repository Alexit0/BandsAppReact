import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage, { loader as bandsLoader } from "./pages/Home";
import BandPage, { loader as bandDetailsLoader } from "./pages/Band";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import EditBandPage from "./pages/EditBand";
import NewBandPage, { action as newBandAction } from "./pages/NewBand";
import BandsRootLayout from "./pages/BandsRoot";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import AboutPage from "./pages/About";
import MusiciansPage, { loader as musiciansLoader } from "./pages/Musicians";
import MusicianPage, {
  loader as musicianDetailLoader,
  action as deleteAction,
} from "./pages/Musician";
import MusiciansRootLayout from "./pages/MusiciansRoot";
import EditMusicianPage from "./pages/EditMusician";
import NewMusicianPage from "./pages/NewMusician";
import { action as manipulateMusicianAction } from "./components/MusicianForm";

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
        index: true,
        element: <HomePage />,
        loader: bandsLoader,
      },
      {
        path: "band",
        element: <BandsRootLayout />,
        children: [
          {
            id: "band-details",
            path: ":bandName",
            loader: bandDetailsLoader,
            element: <BandPage />,
          },
          {
            path: "new",
            element: <NewBandPage />,
            action: newBandAction,
            loader: checkAuthLoader,
          },
          { path: ":bandName/edit", element: <EditBandPage /> },
        ],
      },
      {
        path: "musicians",
        children: [
          {
            path: "",
            element: <MusiciansPage />,
            loader: musiciansLoader,
          },
          {
            id: "musician-details",
            path: ":musicianId",
            element: <MusiciansRootLayout />,
            loader: musicianDetailLoader,
            action: deleteAction,
            children: [
              {
                index: true,
                element: <MusicianPage />,
                // action: deleteAction,
              },
              {
                path: "edit",
                element: <EditMusicianPage />,
                action: manipulateMusicianAction,
              },
            ],
          },
          {
            path: "new",
            element: <NewMusicianPage />,
            action: manipulateMusicianAction,
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
