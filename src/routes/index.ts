import UserRoutes from "../routes/user.route";
import AuthRoutes from "../routes/auth.route";
import appointmentRoutes from "../routes/appointment.route";
import InviteRoutes from "../routes/invites.route";
import testRouter from "../routes/test.route";
/**
 * @description This code exports an array of different routes to be used in an Express application. It imports the route modules from different files and combines them into a single array to be used as the main routes for the application.
 *
 */
export default [
  UserRoutes,
  AuthRoutes,
  appointmentRoutes,
  InviteRoutes,
  testRouter,
];
