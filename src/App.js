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

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: bandsLoader,
      },
      { path: "auth", element: <AuthenticationPage />, action: authAction },
      {
        path: "band",
        element: <BandsRootLayout />,
        children: [
          {
            path: ":bandName",
            element: <BandPage />,
            loader: bandDetailsLoader,
          },
          { path: ":bandName/edit", element: <EditBandPage /> },
          { path: "new", element: <NewBandPage />, action: newBandAction },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} className="App" />;
}

export default App;
