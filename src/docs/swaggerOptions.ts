import { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: process.env.APP_NAME ?? "Pitjarus Backend API",
      version: process.env.APP_VERSION ?? "1.0.0",
      description: "REST API untuk aplikasi Mobile Merchandiser Pitjarus.",
    },

    servers: [
      {
        url: process.env.API_BASE_URL ?? "http://localhost:3000",
        description: "Current Environment",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "https",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    security: [
      {
        BearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.route.ts"],
};