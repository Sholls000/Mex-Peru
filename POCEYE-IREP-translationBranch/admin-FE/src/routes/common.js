import CoordinatesUpdatePage from "../pages/coordinatesUpdate";
import PasswordUpdatePage from "../pages/credentialsUpdate";
import LandingPage from "../pages/landingPage";
import login from "../pages/login";

const CommonRoutes = [
  { route: "/coordinates-update", component: CoordinatesUpdatePage },
  { route: "/dashboard", component: LandingPage },
  { route: "/credentials-update", component: PasswordUpdatePage },
];

export const otherRoutes = [
  { route: "/", component: login },
];

export default CommonRoutes;
