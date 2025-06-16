import { getToken } from "../utils/auth";
import { Home } from "./Home";

export const LandingOrFeed = () => {
  const token = getToken();

  return token ? <Home /> : <>Damu</>;
};
