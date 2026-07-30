import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import routes from "./routes";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { swaggerUi, swaggerSpec,} from "./docs/swagger";

const app = express();

app.use(helmet());

app.use(cors());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Swagger
app.get("/", (_, res) => {
  res.redirect("/docs");
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Pitjarus Backend API",
  })
);

app.get("/openapi.json", (_, res) => {
  res.json(swaggerSpec);
});

// Api
app.use("/v1", routes);

app.use(notFoundHandler);

app.use(errorHandler);
export default app;