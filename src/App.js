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
import { tokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      {
        index: true,
        element: <HomePage />,
        loader: bandsLoader,
      },
      {
        path: "band",
        element: <BandsRootLayout />,
        children: [
          ,
          {
            id: "band-details",
            path: ":bandName",
            loader: bandDetailsLoader,
            element: <BandPage />,
          },
          { path: "new", element: <NewBandPage />, action: newBandAction },
          { path: ":bandName/edit", element: <EditBandPage /> },
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
