import AdminRoutes from "./admin";
import CommonRoutes from "./common";
import { otherRoutes } from "./common";

const AllRoutes = [...AdminRoutes, ...CommonRoutes];
export const nonPrivateRoutes = [...otherRoutes];

export default AllRoutes;
