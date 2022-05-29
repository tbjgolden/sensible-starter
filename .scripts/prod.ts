#!/usr/bin/env node
/* eslint-disable no-console */
import path from "node:path";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import { getEnv } from "./env";
import { parseURL } from "./lib/url";
import { getPackageRoot } from "./lib/package";

const ENV = getEnv();

const { port: autoPort, host: HOST } = parseURL(ENV.VITE_FRONTEND_BASE_URL);

const PORT =
  ENV.LOCALHOST_FRONTEND_PORT === "auto"
    ? Number.parseInt(ENV.LOCALHOST_FRONTEND_PORT)
    : autoPort;

const main = async () => {
  const packageRoot = await getPackageRoot();

  const app = express();

  // a request logger
  app.use(morgan("combined"));
  // general security
  app.use(
    helmet({
      // if using nginx as a reverse proxy, re-enable this
      contentSecurityPolicy: false,
    })
  );

  // gzip compression
  app.use(compression());
  // perma-cacheable static files
  app.use(
    "/assets",
    express.static(path.join(packageRoot, "dist", "assets"), {
      setHeaders: (response) => {
        response.setHeader("Cache-Control", "max-age=31536000, immutable");
      },
    })
  );
  // un-perma-cacheable static files
  app.use(express.static(path.join(packageRoot, "dist")));
  // redirect 404 GET requests to the index.html file
  // to allow react-router to handle them
  app.use((request, response, next) => {
    if (request.method === "GET") {
      response.sendFile(path.join(packageRoot, "dist", "index.html"));
    } else {
      next();
    }
  });

  app.listen(PORT, () => {
    console.log(`Started: ${HOST}`);
  });
};

main();
