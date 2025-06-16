import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "../App";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";
import { UserList } from "../pages/UserList";
import { getToken } from "../utils/auth";
import { LandingOrFeed } from "../pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        index: true,
        element: <LandingOrFeed />,
        loader: () => {
          const token = getToken();
          if (!token) {
            // Redirect to home
            return redirect("/sign-in");
          }
          return null;
        },
      },
      {
        path: "sign-in",
        element: <SignIn />,
        loader: () => {
          const token = getToken();
          if (token) {
            // Redirect to home
            return redirect("/home");
          }
          return null;
        },
      },
      {
        path: "sign-up",
        element: <SignUp />,
        loader: () => {
          const token = getToken();
          if (token) {
            // Redirect to home
            return redirect("/home");
          }
          return null;
        },
      },
      {
        path: "profile",
        element: <Profile />,
        loader: () => {
          const token = getToken();
          if (!token) {
            // Redirect to home
            return redirect("/sign-in");
          }
          return null;
        },
      },
      {
        path: "user-list",
        element: <UserList />,
        loader: () => {
          const token = getToken();
          if (!token) {
            // Redirect to home
            return redirect("/sign-in");
          }
          return null;
        },
      },
    ],
  },
]);

export default router;
