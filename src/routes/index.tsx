import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import ErrorPage from "./ErrorPage";
import HomePage, { loader as homeLoader } from "./HomePage";
import TouristPage, { loader as touristLoader } from "./TouristPage";
import ProfilePage, { loader as profileLoader } from "./ProfilePage";
import RegisterPage from "./RegisterPage";
import TouristEditPage from "./TouristEditPage";
import TouristAddPage from "./TouristAddPage";

const AuthenticatedRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        loader: homeLoader,
        id: "tourists",
        children: [
          {
            path: "add",
            element: <TouristAddPage />,
          }
        ]
      },
      {
        path: "Tourist/:id",
        element: <TouristPage />,
        loader: touristLoader,
        id: "tourist",
        children: [
          {
            path: "edit",
            element: <TouristEditPage />,
          }
        ]
      },
      {
        path: "/profile",
        element: <ProfilePage />,
        loader: profileLoader,
      },
      {
        path: "/logout",
        element: <div>Logout</div>,
      },
    ],
  },
];

const NotAuthenticatedRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
];

const Routes = () => {
  const allRoutes = [...AuthenticatedRoutes, ...NotAuthenticatedRoutes];
  const router = createBrowserRouter(allRoutes);

  return <RouterProvider router={router} />;
};

export default Routes;
