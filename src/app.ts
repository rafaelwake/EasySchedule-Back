import express from "express";
const app = express();

// ENV Variables
import _default from "../config/default";

// Routes
import router from "./router";

const port = _default.port;

app.use("/api/", router);

app.listen(port, async () => {
  console.log(`App rodando na porta: ${port}`);
});
