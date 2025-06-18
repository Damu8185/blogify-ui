import { createBrowserRouter, redirect } from "react-router-dom";
import { App } from "../App";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Profile } from "../pages/Profile";
import { UserList } from "../pages/UserList";
import { getToken } from "../utils/helper";
import { LandingOrFeed } from "../pages/LandingPage";
import { PostDetails } from "../pages/PostDetails";
import { AuthLayout } from "../components/AuthLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
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
    ],
  },
  {
    path: "/home",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingOrFeed />,
      },
      {
        path: "profile/:user_id",
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
      {
        path: "post/:post_id",
        element: <PostDetails />,
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
