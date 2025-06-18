import BlogCards from "../components/FeedCards";
import { getToken } from "../utils/auth";
import { Home } from "./Home";

export const LandingOrFeed = () => {
  const token = getToken();

  return token ? <Home /> : <BlogCards />;
};
