import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { Outlet } from "react-router-dom";

const Home = () => <h1>Home</h1>;
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
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
