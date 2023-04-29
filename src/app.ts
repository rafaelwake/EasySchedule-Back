import express from "express";
const app = express();

// ENV Variables
import _default from "../config/default";

// Routes
import router from "./router";

// Logger
import Logger from "../config/logger";

// Middlewares
import morganMiddleware from "./middleware/morganMiddleware";
app.use(morganMiddleware);

const port = _default.port;

app.use("/api/", router);

app.listen(port, async () => {
  Logger.info(`App rodando na porta: ${port}`);
});
