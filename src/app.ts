import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import routes from "./routes";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

export default app;