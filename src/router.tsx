import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

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
        path: "posts/:id",
        element: <Post />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/create",
        element: (
        <ProtectedRoute>
          <CreatePost />
        </ProtectedRoute>),
      },
      {
        path: "admin/posts/:id/edit",
        element: (
          <ProtectedRoute>
            <EditPost />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
