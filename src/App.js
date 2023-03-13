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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
          {
            path: ":bandName",
            element: <BandPage />,
            loader: bandDetailsLoader,
            children: [],
          },
          { path: ":bandName/edit", element: <EditBandPage /> },
          { path: "new", element: <NewBandPage />, action: newBandAction },
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
