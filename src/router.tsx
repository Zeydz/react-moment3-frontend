import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Home from "./pages/Home";

const Error = () => <h1>Error</h1>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      /*       {
        path: "admin/create",
        element: (
          <ProtectedRoute></ProtectedRoute>
        )
      }, */
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
