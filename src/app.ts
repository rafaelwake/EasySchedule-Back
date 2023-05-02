import express, { Response, Request } from "express";
import router from "../src/routes";
import * as dotenv from "dotenv";
import cors from "cors";
/**
 * @description This is the main entry point of a Node.js application that runs an Express server. It loads a router module from the "routes" file and sets up middleware including CORS and logging. It defines routes, including a 404 fallback route. The application listens on a specified port and logs a message to indicate it's running.
 *
 */
// ENV Variables
dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// EXPRESS & CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logger
import Logger from "../config/logger";

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware";
app.use(morganMiddleware);

// Routes
app.use("/api/", router);
app.use((req: Request, res: Response) => {
  Logger.info(req.url);

  res.status(404).json({
    message: "route not found!",
  });
});

app.listen(PORT, async () => {
  Logger.info(`App rodando na porta: ${PORT}`);
});
